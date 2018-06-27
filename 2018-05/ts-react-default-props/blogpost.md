# React,TypeScript and defaultProps dilemma,

> a.k.a "Solving a million dollar problem"

Let's say, you wanna use/are using React, and you made a decision to use a typed JavaScript with it ... and you pick TypeScript for the job. Let me congratulate you for this decision in a first place, as your Dev life is going to be much easier from now on thanks to the type safety and top notch DX in the first place! Anyways, you'll start developing your first pieces of your React app with TypeScript. Everything will go flawlessly, until you'll come to this first "huge" issue. Dealing with `defaultProps` in your components...

> This post is based on TypeScript 2.9 and uses a strict mode. If you don't use strict mode, turn it on ASAP because not using strict mode is like cheating on your girlfriend and you don't wanna do that. right? ( if you're in gradual migration phase from js to TS, nonStrict is OK ! )

> In this article I will demonstrate the issue and how to solve it via class Components.

So let's define a `Button` component, with following API, which will be used across this blogpost.

**Button API**

- onClick ( click handler )
- color ( what color will be used )
- type (button type 'button' or 'submit')

We will annotate `color` and `type` as optional, because they will be defined via defaultProps, so consumer of our component doesn't have to provide those.

![Button with default props](./img/button-initial-implementation.png)

```tsx
import { SFC, MouseEvent, Component } from 'react'
import React from 'react'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
  color?: 'blue' | 'green' | 'red'
  type?: 'button' | 'submit'
}

class Button extends Component<Props> {
  static defaultProps = {
    color: 'blue',
    type: 'button',
  }
  render() {
    const { onClick: handleClick, color, type, children } = this.props

    return (
      <button type={type} style={{ color }} onClick={handleClick}>
        {children}
      </button>
    )
  }
}
```

Now when we use it within our root App component, we get correct optional and required props compile time checking/intellisense:

![Button with default props](./img/button-default-props-0.gif)

```tsx
class App extends Component {
  private handleClick = () => {
    console.log('clicked!')
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Click me!</Button>
      </div>
    )
  }
}
```

Everything works and it's typed. Beautiful. We can go home now... Well not so fast my friends!

Our `Button`s `defaultProps` are not typed at all, because type checker cannot infer types from generic class extentions definition to its static properties.

What does that even mean?

- you can set anything to your `static defaultProps`
- your are defining same things twice ( types and implementation )

No type checking for defaultProps:

![Button with default props not type safe](./img/button-default-props-0.1.gif)

We can fix this by extracting `color` and `type` type properties to separate type and then use type intersection by mapping our defaults to be optional via `Partial` mapped type helper from ts standard library.

Then we need to explicitly annotate our `static defaultProps: DefaultProps` which will get us proper type safety/DX within our defaultProps implementation!

```tsx
type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
} & Partial<DefaultProps>

type DefaultProps = {
  color: 'blue' | 'green' | 'red'
  type: 'button' | 'submit'
}

class Button extends Component<Props> {
  static defaultProps: DefaultProps = {
    color: 'blue',
    type: 'button',
  }
  // ...
}
```

![Button with type safe default props](./img/button-default-props-1.gif)

Last thing what I tend to do, is to extract `defaultProps` and `initialState`(if state is used) to separate constants, which will give us also another benefit -> obtaining type definition from implementation, which introduces less boilerplate in your codebase and only one source of truth --> the implementation.

![Default props as source of truth](./img/button-default-props-1.1.png)

```tsx
type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
} & Partial<DefaultProps>
type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}

class Button extends Component<Props> {
  static defaultProps = defaultProps
  //...
}
```

So far so good.

Let's introduce some logic to our component shall we?

Let's say we don't wanna use just css inline styles ( which is an antipattern/bad performance ), and based on `color` prop, we wanna generate appropriate css class with some pre defined style definition.

We'll define a `resolveColorTheme` function, which will accept our color prop and as outcome we will get css className.

![Button with logic](./img/button-with-logic.png)

```tsx
type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
} & Partial<DefaultProps>
type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}

const resolveColorTheme = (color: DefaultProps['color']) => {
  const btnThemes = {
    blue: 'btn-primary',
    green: 'btn-secondary',
    red: 'btn-accent',
  }
  return btnThemes[color] || 'btn-default'
}

class Button extends Component<Props> {
  static defaultProps = defaultProps
  render() {
    const { onClick: handleClick, color, type, children } = this.props

    const cssClass = resolveColorTheme(color)

    return (
      <button type={type} className={cssClass} onClick={handleClick}>
        {children}
      </button>
    )
  }
}
```

**With this we will get a compile error! oh no! panic!**

```
Type 'undefined' is not assignable to type '"blue" | "green" | "red"'
```

![compile error](./img/button-default-props-2-compile-error.gif)

Why do we get an error now? Well `color` is optional, and we are in strict mode, which means, that the type union is extended by an `undefined`/`void` type, but our function doesn't accept `undefined`. This is also compiler at it's best, which tries to protect us to adhere to proper program execution ( remember the times `undefined is not a function` ? ).

## How to fix this aka solving the million dollar problem?

As of today _June 2018/TypeScript 2.9_ there are 4 options how to fix this:

- Non-null assertion operator
- Component type casting
- High order function for defining defaultProps
- Props getter function

Let's take a look at those one by one.

### 1. Non-null assertion operator

This solution is a no brainer, all you need to do is tell the type checker explicitly that hey dude, this won't be null or undefined, trust me I'm an human...ehm 🤖... This is achieved by non-null assertion operator `!`

![default props solution 1](./img/solution-1.png)

```tsx
const { onClick: handleClick, color, type, children } = this.props
const cssClass = resolveColorTheme(color!)

// OR

const color = this.props.color!
const cssClass = resolveColorTheme(color)
```

This might be ok for simple use cases ( like small props API, accessing particular props only in render method ), but once your component starts to grow, it can get messy and confusing pretty quickly. Also you need to double check all the time which prop is defined as defaultProps -> more cognitive overhead for developer === bad DX / error prone

### 2. Component type casting

So how to solve our problem with mitigating all the pittfals mentioned in first solution?

We can create our component via anonymoys class and assign it to constant which we will cast to final outcome component with proper prop types while keeping all "defaultProps" as NonNullable within our implementation

![default props solution 2](./img/solution-2.png)

```tsx
type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}

const Button = class extends Component<Props & DefaultProps> {
  static defaultProps = defaultProps
  render() {
    const { onClick: handleClick, color, type, children } = this.props

    const cssClass = resolveColorTheme(color)

    return (...)
  }
} as ComponentClass<Props>
```

This solves our former problem, but somehow it feels like a dirty hack to me.

Can we improve this somehow? Well TypeScript 2.8 introduced a very powerful feature - **conditional types**. Let's use the new and shinny feature with more functional approach, shall we ?

### 3. High order function for defining defaultProps

We can define a factory function/high order function, for declaring defaultProps and leveraging conditional types to correctly resolve our props API.

![default props solution 3](./img/solution-3.png)

```tsx
type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
} & DefaultProps

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}

const Button = withDefaultProps(
  defaultProps,
  class extends Component<Props> {
    render() {
      const { onClick: handleClick, color, type, children } = this.props

      const cssClass = resolveColorTheme(color)

      return (...)
    }
  }
)
```

I like this ! We don't use React API for defining defaultProps, this is handled by our `withDefaultProps` function. Also we don't need any additional `type DefaulProps` in this case. Everything is handled by TypeScript.

Let's take a look at our `withDefaultProps` implementation:

```tsx
export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: ComponentType<P>
) => {
  // we are extracting default props from component Props api type
  type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>

  // we are re-creating our props definition by creating an intersection type
  // between Props without Defaults and DefaultProps mapped to optional via Partial mapped types helper
  type RecomposedProps = Partial<DP> & PropsExcludingDefaults

  // Implementation -> here we set our defaultProps
  Cmp.defaultProps = defaultProps

  // we override return type definition by turning type checker off
  // for original props  and setting the correct return type
  return (Cmp as ComponentType<any>) as ComponentType<RecomposedProps>
}
```

This is awesome! So are we done here Martin? Of course. Hmm.. but wait... what about Generic Components? Oh no, I completely forgot about that usecase.

> Excuse me ! What do you mean by Component with generic props?

![generic component issue](./img/solution-3-generic-issue.png)

```tsx
class Button<T> extends Component<Props<T>> {...}


class App extends Component {
  render(){
    return <Button <number>>click me</Button>
  }
}
```

```tsx
const Button = withDefaultProps(
  defaultProps,
  class Button<T> extends Component<Props<T>> {...}
)

// Error. Button is not generic
class App extends Component {
  render(){
    return <Button <number>>click me</Button>
  }
}
```

If we would like to use this pattern with generic props, our generic type would be lost, so if you wanna define a generic component, this solution is not feasible :(, besides that, all good!

So is there some ultimate pattern Martin?

Well I don't know if it's ultimate, but it works and covers all previously mentioned issues.

### 4. Props getter function

Behold! the humble factory/closure identity function pattern with conditional types mapping.

> Note that we are leveraging similar type mapping constructs like we did for `withDefaultProps` function except that we don't map defaultProps to be optional as they are not optional within our component implementation.

![prop getter factory function](./img/solution-4-function.png)

```tsx
export const createPropsGetter = <DP extends object>(defaultProps: DP) => {
  return <P extends Partial<DP>>(props: P) => {
    // we are extracting default props from component Props api type
    type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>

    // we are re-creating our props definition by creating an intersection type
    // between Props without Defaults and NonNullable DefaultProps
    type RecomposedProps = DP & PropsExcludingDefaults

    // we are returning the same props that we got as argument - identity function.
    // Also we are turning off compiler and casting the type to our new RecomposedProps type
    return (props as any) as RecomposedProps
  }
}
```

Our function creates closure and with that stores/infers defaultProps type information via generic parameter. Then the function just returns merged `props` with `defaultProps` and from the runtime perspective it returns the same props that we passed, so standard React API is used for runtime props aquisition/resolution.

> Also note that we are explicitly setting `children` prop to our public Props API, which is saying that our Button needs to have one child of type ReactNode. If consumer of our component would not provide ReactNode as child, compiler would notify us by compile error. Gracias TypeScript !

Let's use this within our component implementation !

![solution 4 component](./img/solution-4-component.png)

```tsx
type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
  children: ReactNode
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}
const getProps = createPropsGetter(defaultProps)

class Button extends Component<Props> {
  static defaultProps = defaultProps
  render() {
    const { onClick: handleClick, color, type, children } = getProps(this.props)

    const cssClass = resolveColorTheme(color)

    return (
      <button type={type} className={cssClass} onClick={handleClick}>
        {children}
      </button>
    )
  }
}
```

Further explanation what's going on:

![solution 4 explanation](./img/solution-4.png)

This is very slick, don't you think ?

We are done here, this final solution covers all former issues:

- no need for escape hatches by using non null assertion operator
- no need to cast our component to other types with more indirection ( additional const Button )
- we don't have to re-create component implementation and thus loosing any types in the process ( withDefaultProps function )
- works with generic components
- easy to reason about and future proof ( TypeScript 3.0 )

## TypeScript 3.0

If you think that TypeScript team didn't noticed this "million dollar problem", you're completely wrong. Those guys love the community and trying to gives us the best JS type checker on the planet. So yeah, Daniel Rosenwasser created an issue recently about [better support for default props in JSX](https://github.com/Microsoft/TypeScript/issues/23812) which is targeted for TypeScript 3.0

**TL;DR**:

TypeScript will implement generic way (powered by conditional types, no magic strings or tightly coupling in compiler for specific technology/React) how to obtain **default props** and will reflect those within JSX, by looking up factory function definition, which is responsible for creating VirtualDom objects ( for React - `createElement` , for Preact - `h`,...). Also that's one of the reason why are we preserving React API for defining defaultProps in our last solution.

With that said, we are at the end of our jorney for solving the million dollar problem, yay !

---

As always, don't hesitate to ping me if you have any questions here or on twitter (my handle [@martin_hotell](https://twitter.com/martin_hotell)) and besides that, happy type checking folks and 'till next time! Cheers!
