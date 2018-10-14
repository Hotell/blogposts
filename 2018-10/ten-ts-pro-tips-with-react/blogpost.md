# 10 TypeScript Pro tips with ( or without ) React

> 🎒 this article uses following library versions:

```json
{
  "@types/react": "16.4.16",
  "@types/react-dom": "16.0.9",
  "typescript": "3.1.3",
  "react": "16.5.2",
  "react-dom": "16.5.2"
}
```

> 🎮 [source code can be found on my github profile](https://github.com/Hotell/blogposts/tree/master/2018-10/ten-ts-tips-with-react)

---

## 1. Don't use `public` accessor within classes

**Don't:**

```tsx
class App extends Component {
  public handleChange() {}
  public render() {
    return <div>Hello</div>
  }
}
```

**Do:**

```tsx
class App extends Component {
  handleChange() {}
  render() {
    return <div>Hello</div>
  }
}
```

**Why?**

All members within class are `public` by default (and always public in runtime, TS private/protected will "hide" particular class properties/methods only during compile time). Don't introduce extra churn to your codebase. Also using `public` accessor is not "valid/idiomatic javascript"

## 2. Don't use `private` accessor within Component class

**Don't:**

```tsx
class App extends Component {
  private handleChange = (ev: import('react').ChangeEvent) => {}
  render() {
    return (
      <div>
        <input onChange={this.handleChange} />
      </div>
    )
  }
}
```

**Good:**

```tsx
class App extends Component {
  _handleChange = (ev: import('react').ChangeEvent) => {}
  render() {
    return (
      <div>
        <input onChange={this._handleChange} />
      </div>
    )
  }
}
```

**Better:**

```tsx
const _handleChange = Symbol('handleChange')

class App extends Component {
  // private property via symbol
  [_handleChange] = (ev: import('react').ChangeEvent) => {}

  render() {
    return (
      <div>
        <input onChange={this[_handleChange]} />
      </div>
    )
  }
}
```

**Why:**

`private` accessor won't make your properties/methods on class private during runtime. It's just TypeScript "emulation during compile time". Don't get fooled and make things "private" by using well known patterns like:

- name starting with underscore 👉 `_someProp`
- or if you really wanna make those properties private use `Symbol` for defining those. ( [real runtime private properties are coming to ECMAscript](https://github.com/bloomberg/TypeScript/pull/6) )

In reality, you should almost never need to work directly with React Component instance nor accessing its class properties.

## 3. Don't use `protected` accessor within Component class

**Why:**

Using `protected` is an immediate RED ALERT in terms of functional patterns with React,
that you wanna do something via OOP approach. There are more effective patterns like this for "mixin" like behaviour, in particular **high order functions** and **functional composition**.

## 4. Don't use `enum`

**Don't:**

```tsx
enum ErrorCodes {
  NotFound,
  Forbidden
}

enum ActionTypes {
  Get = '[Crud operation] GET'
  Post = '[Crud operation] POST'
  Delete = '[Crud operation] DELETE'
}
```

**Good:**

```tsx
const ErrorCodes = {
  NotFound: 404,
  Forbidden: 403
}

const ActionTypes = {
  Get: '[Crud operation] GET'
  Post: '[Crud operation] POST'
  Delete: '[Crud operation] DELETE'
}
```

**Better:**

```tsx
const ErrorCodes = Object.freeze({
  NotFound: 404 as 404,
  Forbidden: 403 as 403
})

const ActionTypes = Object.freeze({
  Get: '[Crud operation] GET'
  Post: '[Crud operation] POST'
  Delete: '[Crud operation] DELETE'
})
```

**Why?**

To use `enum` within TypeScript, might be very tempting, especially if you're coming from language like C# or Java. But there are better ways how to interpret both with well known JS patterns:

## 5. Don't use `constructor` for class Components

**Don't:**

```tsx
type State = { counter: 0 }
type Props = {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props: Props)
    this.state = {
      counter: 0,
    }
  }
}
```

**Do:**

```tsx
type State = { counter: number }
type Props = {}

class App extends Component<Props, State> {
  state = {
    counter: 0,
  }
}
```

**Why:**

There is really no need to use constructor within React Component. If you do so, you need to provide more code boilerplate and also need to call `super` with provided props ( if you forget to pass props to your super, your component will contain bugs as props will not be propagated correctly).

Of course you may ask, what if I need to introduce some logic te initialize component state, or even to initialize the state on values based from props. Solution is easy. Just define a pure function outside the component, which can be easily tested as well 👌

```tsx
type State = { counter: number }
type Props = { initialCount: number }

const getInitialState = (props: Props) => {
  /*some logic here*/ return {
    /*demanded object*/
  }
}

class App extends Component<Props, State> {
  state = getInitialState(this.props)
}
```

## 6. Don't use decorators for class Components

**Don't:**

```tsx
@connect(mapStateToProps)
export class Container extends Component {}
```

**Good:**

```tsx
const enhance = connect(mapStateToProps)
class Container extends Component {}

const EnhancedComponent = enhance(Container)
export { EnhancedComponent as Container }
```

**Better:**

```tsx
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18n'

const enhance = compose(
  translate(),
  connect(mapStateToProps)
)
class Container extends Component {}

export default enhance(Container)
```

**Why:**

Decorators are parasitic 🐛. That means you won't be able to get clean version of your class. Also TypeScript uses version of decorators which is not gonna be implemented in ECMAscript standard. It adds additional runtime code and processing to your app. What is most important though in terms of type checking within JSX, is that decorators don't enhance class type. That means (in our example), the Container will have absolutely no type information for consumer about added props and so on.

## 7. Use type lookup for accessing component State or Props types

**Don't:**

```tsx
// counter.tsx
export type State = { counter: number }
export type Props = { someProps: string }

export class Counter extends Component<Props, State> {
  /*...some code*/
}

// consumer.tsx
import { Props, Counter } from './counter'
type SomeType = Props & {
  /* ... */
}

class Consumer extends Component {
  render() {
    return (
      <>
        <Counter />
      </>
    )
  }
}
```

**Do:**

```tsx
// counter.tsx
type State = { counter: number }
type Props = { someProps: string }

export class Counter extends Component<Props, State> {
  /*...some code*/
}

// consumer.tsx

// CLEANER API
import { Counter } from './counter'

// 🙇‍ USE LOOKUP TYPE
type SomeType = Counter['props'] & {
  /*...*/
}

class Consumer extends Component {
  render() {
    return (
      <>
        <Counter />
      </>
    )
  }
}
```

**Why:**

Exporting Props or State from your component implementation is making API surface bigger. Do you really want that or rather let's ask why should consumers of your component be able to import State/Props type information? If they really need that info, they can access it via lookup types functionality

## 8. Always provide explicit type for `children` Props

**Don't:**

```tsx
// ==========
// button.tsx

import React, { Component } from 'react'

class Button extends Component {
  render() {
    const { children } = this.props

    return <button>{children}</button>
  }
}

// ===============
// user-detail.tsx

type Props = { id: string; name: string; email: string }
class UserDetail extends Component<Props> {
  render() {
    const { id, email, name } = this.props
    return (
      <section>
        <h3>
          {name} : {id}
        </h3>
        <p>Email : {email}</p>
      </section>
    )
  }
}

// =======
// app.tsx

const App = () => (
  <main>
    <Button>click</Button>
    <Button />
    <UserDetail id="421312" email="johnny@five.org" name="Johnny the Fifth" />
    <UserDetail id="421312" email="johnny@five.org" name="Johnny the Fifth">
      Who am I?
    </UserDetail>
  </main>
)
```

**Do:**

```tsx
// ==========
// button.tsx

type Props = {
  children: children: import('react').ReactNode
}
class Button extends Component<Props> {
  render() {
    const { children } = this.props

    return <button>{children}</button>
  }
}

// ===============
// user-detail.tsx

type Props = { id: string; name: string; email: string; children?: never }

class UserDetail extends Component<Props> {
  render() {
    const { id, email, name } = this.props
    return (
      <section>
        <h3>
          {name} : {id}
        </h3>
        <p>Email : {email}</p>
      </section>
    )
  }
}

// =======
// app.tsx

import {Button} from './button'
import {UserDetail} from './user-detail'

const App = () => (
  <main>
    <Button>click</Button>
    {/* $Expect Error */}
    <Button />
    <UserDetail id="421312" email="johnny@five.org" name="Johnny the Fifth" />
    {/* $Expect Error */}
    <UserDetail id="421312" email="johnny@five.org" name="Johnny the Fifth">
      Who am I?
    </UserDetail>
  </main>
)
```

**Why:**

`children` prop is annotated as optional within both Component and Functional Component in `react.d.ts` which just mirrors the implementation how React handles children.
While that's ok and everything, I prefer to be explicit with component API.

For those reasons, if you plan to use children for content projection, make sure to explicit annotate it with type of your choosing and in opposite if your component doesn't use it, prevent it's usage with `never`.

### Children type constraint

You may ask, What types are supported for `children` ? Can I constraint children to be only a particular type of Component ( like is possible with Flow ) ? like `Tab` within `Tabs` ? Unfortunately not, as TypeScript isn't able to "parse" the JSX tree and get proper return object, only following types are "allowed":

- `ReactNode`
- `ReactChild`
- `object` | `{[key:string]:unknown}` | `MyModel`
- `Array<T>`
- primitives `string` | `number` | `boolean`
- `never`

## 9. Use type inference for defining Component State or DefaultProps

**Don't:**

```tsx
type State = { count: number }
type Props = { someProps: string } & DefaultProps
type DefaultProps = { who: string }

export class Counter extends Component<Props, State> {
  static defaultProps: DefaultProps = { who: 'Johnny 5' }
  state = {
    count: 0,
  }
}
```

**Good:**

```tsx
// $ExpectType { count: number; }
type State = typeof initialState
// $ExpectType { someProps: string; } & { who: string; }
type Props = { someProps: string } & typeof defaultProps

const initialState = { count: 0 }
const defaultProps = { who: 'Johnny 5' }

export class Counter extends Component<Props, State> {
  static defaultProps = defaultProps
  state = initialState
}
```

**Better:**

```tsx
type State = typeof initialState
type Props = { someProps: string } & typeof defaultProps

const initialState = Object.freeze({ count: 0 })
const defaultProps = Object.freeze({ who: 'Johnny 5' })

export class Counter extends Component<Props, State> {
  static readonly defaultProps = defaultProps
  readonly state = initialState
}
```

**Why:**

- Type information is always synced with implementation as source of truth is only one thing 👉 THE IMPLEMENTATION! 💙
- Less type boilerplate
- More readable code
- by adding readonly modifier and freezing the object, any mutation within your component will immediately end with compile error, which will prevent any runtime error = happy consumers of your app!

> What if I wanna use more complicated type within state or default props?

Use `as` operator to cast your properties within the constant.

Example:

```tsx
import { Todo } from './models'

// $ExpectType { readonly todos: Todo[] | null; }
type State = typeof initialState

const initialState = Object.freeze({ todos: null as null | Todo[] })
```

## 10. When using factories instead of classes for models, leverage declaration merging by exporting both type and implementation

**Don't:**

```tsx
// models.ts

export const Todo = (description: string) => ({
  id: String(Date.now()),
  done: false,
  description,
})

// consumer.ts

// Todo is only factory
import { Todo } from './models'
// we need to manually create Todo interface to be able to reference it
interface TodoModel extends ReturnType<typeof Todo> {}

const initialState = Object.freeze({ todos: null as null | TodoModel[] })

class App extends Component<{}, State> {
  readonly state = initialState
  handleTodoCreation = (description: string) => {
    const newTodo = Todo(description)
    // update state etc
  }
}
```

**Do:**

```tsx
// models.ts

export const Todo = (description: string) => ({
  id: String(Date.now()),
  done: false,
  description,
})

export interface Todo extends ReturnType<typeof Todo> {}

// =======================================================

// consumer.ts

// Todo is both factory and type
import { Todo } from './models'

const initialState = Object.freeze({
  // 1. Todo used as type
  todos: null as null | Todo[],
})

class App extends Component<{}, State> {
  readonly state = initialState
  handleTodoCreation = (description: string) => {
    // 2. Todo used as factory
    const newTodo = Todo(description)
    // update state etc
  }
}
```

**Why:**

- Less Boilerplate
- One token for both type and implementation / Smaller API
- Both type and implementation are in sync and most importantly, implementation is the source of truth

---

## Summary

That's it for today! Hope you gonna apply those patterns sooner than later within your code base or even better use them as part of your project style guide.

[And remember. Respect, is everything! 😅](https://www.youtube.com/watch?v=EloDnA1_XEU)

---

As always, don't hesitate to ping me if you have any questions here or on Twitter (my handle [@martin_hotell](https://twitter.com/martin_hotell)) and besides that, happy type checking folks and 'till next time! Cheers! 🖖 🌊 🏄
