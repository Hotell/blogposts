# Outline

## setup project

1.  setup

```sh
yarn init -y
```

1.  add deps

```sh
yarn add react react-dom
yarn add -D @types/{react,react-dom} parcel-bundler typescript prettier
```

1.  setup compiler

```sh
yarn tsc --init
```

```json
{
  "module": "es2015",
  "lib": ["es2015", "dom"],
  "jsx": "react",
  "outDir": "./out-tsc",
  "moduleResolution": "node",
  "allowSyntheticDefaultImports": true,
  "esModuleInterop": true
}
```

1.  add start script

```json
{
  "start": "parcel src/index.html"
}
```

1.  Create files

```sh
mkdir src
touch index.html main.ts app.tsx
```

index.html

```html
<body>
  <div id="app"></div>
  <script src="main.ts"></script>
</body>
```

app.tsx

```ts
import React from 'react'

export const App = () => <>Hello ngParty</>
```

main.tsx

```ts
import { render } from 'react-dom'
import { App } from './app'
import { createElement } from 'react'

const mountPoint = document.querySelector('#app')
const bootstrap = () => render(createElement(App), mountPoint)

bootstrap()
```

1.  run

```sh
yarn start
open http://localhost:1234
```

## introduce Provider/Child pattern

app.tsx

```tsx
export const App = () => (
  <>
    <h1>Hello ngParty</h1>
    <Provider>
      <Counter />
    </Provider>
  </>
)
```

provider.tsx

```tsx
import React, { Component, cloneElement } from 'react'

const initialState = { count: 0 }
const inc = (prevState: State): State => ({ count: prevState.count + 1 })
const dec = (prevState: State): State => ({ count: prevState.count - 1 })

type State = Readonly<typeof initialState>
type Props = {}
export class Provider extends Component<Props, State> {
  state: State = initialState
  render() {
    const { children } = this.props
    const { count } = this.state
    const enhancedChildren = cloneElement(children, {
      count,
      onIncrement: this.handleInc,
      onDecrement: this.handleDec,
    })

    return <section>{enhancedChildren}</section>
  }
  private handleInc = () => {
    this.setState(inc)
  }
  private handleDec = () => {
    this.setState(dec)
  }
}
```

counter.tsx

```tsx
import React, { SFC } from 'react'
import './counter.css'

type Props = {
  count: number
  onIncrement(): void
  onDecrement(): void
}
export const Counter: SFC<Props> = ({ onDecrement, onIncrement, count }) => {
  return (
    <div className="counter">
      <button onClick={onIncrement}>+</button>
      <code>{count}</code>
      <button onClick={onDecrement}>-</button>
    </div>
  )
}
```

## demonstrate compile/runtime errors and how to fix them

11. runtime error - cannot clone multiple children

```tsx
<Provider>
  <Counter />
  hello
</Provider>
```

11. fix compile error and runtime error by constraining with `Children.only`

```tsx
cloneElement(Children.only(children), {})
```

11. improve compile time DX by defining children explicitly

provider.tsx

```tsx
type Props = {
  children: ReactElement<any>
}
```

11. make clone element props type-safe

Extract props to getter

```tsx
private get propsForChild() {
  const { count } = this.state
  return {
    count,
    onIncrement: this.handleInc,
    onDecrement: this.handleDec,
  }
}
```

Use type TS inference

```tsx
type EnhancedProps = Provider['propsForChild']

render(){
  const enhancedChildren = cloneElement<EnhancedProps>(Children.only(children), {
    ...this.propsForChild,
  })
}
```

11. fix Counter props issue

- set all props to optional via `Partial`

> this will introduce issues with strictNullChecks
>
> lot's of `!` safe navigation overrides needed, not good!

```tsx
type Props = Partial<{
  count: number
  onIncrement(): void
  onDecrement(): void
}>
```

- introduce HoC on Provider which will make props that we are passing to children optional

```tsx
static withEnhancedProps<P extends object>(Cmp: ComponentType<P>) {
    type PropsExcludingEnhanced = Pick<P, Exclude<keyof P, keyof EnhancedProps>>

    return (Cmp as ComponentType<any>) as ComponentType<PropsExcludingEnhanced>
  }
```

- apply in App

```tsx
const EnhancedCounter = Provider.withEnhancedProps(Counter)

export const App = () => (
  <>
    <h1>Hello ngParty</h1>
    <Provider>
      <EnhancedCounter />
    </Provider>
  </>
)
```

11. introduce children as a function AKA render props pattern

provider.tsx

```tsx
type Props = {
  children: ReactElement<any> | ((props: EnhancedProps) => ReactElement<any>)
}

render() {
    const { children } = this.props
    const { count } = this.state
    const childToRender =
      typeof children === 'function'
        ? children(this.propsForChild)
        : cloneElement<EnhancedProps>(Children.only(children), {
            ...this.propsForChild,
          })

    return <section>{childToRender}</section>
  }
```

app.tsx

```tsx
<Provider>
  {({ count, onDecrement, onIncrement }) => (
    <Counter count={count} onDecrement={onDecrement} onIncrement={onIncrement} />
  )}
</Provider>
<Provider>{props => <Counter {...props} />}</Provider>
```
