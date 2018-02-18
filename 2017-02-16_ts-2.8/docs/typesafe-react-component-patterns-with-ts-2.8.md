# Ultimate React Component Patterns with Typescript 2.8

> Stateful x Stateless, Default Props, Render Callbacks, Component Injection, Generic Components, High Order Components

> This blogpost is inspired by [React Component Patterns post](https://levelup.gitconnected.com/react-component-patterns-ab1f09be2c82)

> [live Demo ](https://codesandbox.io/s/7k236m64w6)

If you know me, you already know that I don't write javascript without types, so yeah I'm really into Typescript, since version 0.9. Beside typed JS I really love React, and when React + Typescript are combined, I just feel like in heaven :D. Complete type safety within whole app and VDOM templates it's just marvelous.

So what is this post all about? Well, there are various articles about React Component patterns on the internet, but none describes how to apply those pattenrs with Typescript. So please sit back and relax, while you master Ultimate React Component Patterns with Typescript!

> all patterns/examples use typescript 2.8 and strict mode

## Start

First off we need to install typescript and tslib helpers so our emitted code is smaller

```sh
yarn add -D typescript@next
yarn add tslib
```

With that we can initilazie our typescript config:

```sh
// this will create tsconfig.json within our project with sane compiler defaults
yarn tsc --init
```

Now let's install react, react-dom and their type definitions.

```sh
yarn add react react-dom
yarn add -D @types/{react,react-dom}
```

Great! Now let's hop into those component patterns shall we ?

## Stateless Component

You guess it, those are components without **state** ( they are also called presentational ). Most of the time they are just pure functions. Let's create contrived Button stateless compoennt with Typescript.

Like in vanilla JS we need to import React and so on

```ts
import React from 'react'

const Button = ({ onClick: handleClick, children }) => <button onClick={handleClick}>{children}</button>
```

Although now compiler will emit errors! We need to be explicit and tell the component/function what is the type of our props. Let's define our props:

```ts
import React, { MouseEvent, ReactNode } from 'react'
type Props = { onClick(e: MouseEvent<HTMLElement>): void; children?: ReactNode }

const Button = ({ onClick: handleClick, children }: Props) => <button onClick={handleClick}>{children}</button>
```

We get rid of all errors! great! But we can do even better!

There is a predefined type within `@types/react` => `type SFC<P>` which is just an alias of `interface StatelessComponent<P>` and it has pre-defined `children` and other things (defaultProps,displayName...), so we don't have to write it everytime on our own!

So the finall declaration is following

```ts
import React, { MouseEvent, SFC } from 'react'
type Props = { onClick(e: MouseEvent<HTMLElement>): void }

const Button: SFC<Props> = ({ onClick: handleClick, children }) => <button onClick={handleClick}>{children}</button>
```

## Stateful Component

Let's create stateful counter component which will leverage our `Button`

First of we need define `initialState`

```ts
const initialState = { clicksCount: 0 }
```

Now we will use Typescript to infer type from that implementation. By doing this we don't have to maintain types and implementation separately, we have only source of thruth, which is the implementation. nice !

```ts
type State = Readonly<typeof initialState>
```

> Also note that type is explicitly mapped to have all properties read-only. We need to be explicit again and define use our State type to define state property on the class `state: State = initialState`
> Why is this useful/needed ?
>
> Well we know that you cannot update `state` within react like this: `this.state.count = 2`
>
> This will throw error during runtime time, but not during compile time. By explicitly mapping our `type State` to readonly, TS will let us know that we are doing something wrong immediately.

whole Container component implementation:

Our Container doesn't have any Props api so we need to type 1st generic argument on generic `Component` as `object` ( because props is always an object) and use `State` type as a 2nd generic argument.

```tsx
const initialState = { clicksCount: 0 }
type State = Readonly<typeof initialState>

class ButtonCounter extends Component<object, State> {
  state: State = initialState
  render() {
    const { clicksCount } = this.state
    return (
      <>
        <Button onClick={this.handleIncrement}>Increment</Button>
        <Button onClick={this.handleDecrement}>Decrement</ButtonViaClass>
        You've clicked me {clicksCount} times!
      </>
    )
  }

  private handleIncrement = () => this.setState(incrementClicksCount)
  private handleDecrement = () => this.setState(decrementClicksCount)
}

const incrementClicksCount = (prevState: State) => ({ clicksCount: prevState.clicksCount + 1 })
const decrementClicksCount = (prevState: State) => ({ clicksCount: prevState.clicksCount - 1 })
```

You've may noticed that we've extracted state update functions to pure functions outside the class. This is very clean a common pattern, as we can test those without ease without any knowledge of renderer layer. Also because we are using typescript and we mapped State to be explicitly read-only, it will prevent us to do any mutations within those functions as well

```ts
const decrementClicksCount = (prevState: State) => ({ clicksCount: prevState.clicksCount-- })

// Will throw following complile error:
//
// [ts]
// Cannot assign to 'clicksCount' because it is a constant or a read-only property.
```

Cool right ? ;)

## Default Props

Let's demonstrate this on our `Button` component

If we wanna define `defaultProps` we can do it via `Button.defaultProps = {...}`. By doing that we need to change our `Props` definition to have defaultProps optional. While this works for this simple example, there is one gotcha. Becasuse we are in strict mode, optional props are both undefined or defined type.

To satisfy TS compiler we can use 3 techniques:

* use **Bang** operator to explicitly tell compiler that this won't be `undefined` within our render, although it is optional, like this: `<button onClick={handleClick!}>{children}</button>`
* use **conditional statements/ternary operator** to make compiler understand that some particular prop is not undefined: `<button onClick={handleClick ? handleClick: undefined}>{children}</button>`
* create reusable `withDefaultProps` High order function, which will update our props type definition and will set our default props. This is the most clean solution, IMHO

```ts
const withDefaultProps = <P extends object, DP extends P = P>(Cmp: ComponentType<P>, defaultProps: DP) => {
  // we are extracting props that need to be required
  type RequiredProps = Omit<P, keyof DP>
  // we are re-creating our props definition by creating and intersection type between
  // all original props mapped to be optional and required to be required
  type Props = Partial<P> & Required<RequiredProps>

  // here we set our defaultProps
  Cmp.defaultProps = defaultProps

  // we override return type definition by turning type checker off and setting the correct return type
  return (Cmp as any) as ComponentType<Props>
}
```

Now we can use our `withDefaultProps` High order function to define our default props:

```ts
type Props = { onClick(e: MouseEvent<HTMLElement>): void }

const defaultProps: Props = {
  onClick: event => undefined,
}
const Button = withDefaultProps<Props>(
  ({ onClick: handleClick, children }) => <button onClick={handleClick}>{children}</button>,
  defaultProps
)
```

Now the Button props are defined correctly, default Props are reflected and those prop types are marked as optional!

```
{
  onClick?(e: MouseEvent<HTMLElement>): void
}
```

And yes this works also for Components defined via `class`

It looks like this:

```ts
type Props = { onClick(e: MouseEvent<HTMLElement>): void }

const defaultProps: Props = {
  onClick: event => undefined,
}

const ButtonViaClass = withDefaultProps<Props>(
  class Button extends Component<Props> {
    render() {
      const { onClick: handleClick, children } = this.props
      return <button onClick={handleClick}>{children}</button>
    }
  },
  defaultProps
)
```

## Render Callbacks

## Component Injection

## Generic Components

## High Order Components
