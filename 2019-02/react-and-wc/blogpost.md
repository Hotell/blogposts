# {Title}

> 🎒 this article uses following library versions:

```json
{
  "@types/react": "16.x.x",
  "@types/react-dom": "16.x.x",
  "typescript": "3.x.x",
  "react": "16.5.2",
  "react-dom": "16.5.2"
}
```

> 🎮 [source code can be found on my github profile](https://github.com/Hotell/blogposts/tree/master/{date}/{title})

---

## TOC

- [x] rendering wc within react
- [x] passing primitive data to wc
- [x] passing non-primitive data to wc
- [] listening to wc custom events
- [x] rendering React via wc slots
- [] wrapping wc to React Component
- [] wrapping React Component to wc for reusability

## {Chapter}

---

<!--Main-->

## Passing non-primitive data to wc

```tsx
class WebComponentUserCardConsumer extends Component<{}, typeof initialState> {
  readonly state = initialState
  render() {
    const { user } = this.state

    return (
      <section className="row flex-spaces">
        <x-user-card user={user} />
      </section>
    )
  }
}
```

Which react renders into following html:

```html
<x-user-card user="[object Object]"></x-user-card>
```

And that of course doesn't work as expected! Oh no panic...

> ### Why is this happening?
>
> React isn't passing data via binding to Intrinsic Elements (native platform, in our case DOM) via props, rather via attributes which are stringified. That's why you we've got `[object Object]` which is exactly what we get if we cast object to string `String({one:1,two:2})`

How can we fix this behavior ?

### Binding data to custom element props (DOM props)

As React isn't capable of setting binding to DOM element props, we need to set it imperatively to our particular element. This can be easily handled by React refs. Let's make our binding work:

```tsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // 1. what we expect, but wont work
      // 'x-user-card': Pick<UserCard, 'user'>

      // 2. we need only react attributes support
      'x-user-card': Partial<Pick<UserCard, 'user'>> & ClassAttributes<UserCard>
    }
  }
}

export class WebComponentUserCardConsumer extends Component<
  {},
  typeof initialState
> {
  readonly state = initialState

  // 1. we create react ref which will contain our custom element instance
  userCardRef = createRef<UserCard>()

  handleUserChange = (user: UserCard['user']) => {
    this.setState((prevState) => ({ user: { ...prevState.user, ...user } }))
  }

  render() {
    const { user } = this.state

    return (
      <section className="row flex-spaces">
        {/*  1. Wont work */}
        <x-user-card user={user} />

        {/*  2. works */}
        <x-user-card ref={this.userCardRef} />

        <DataForm
          initialData={this.state.user}
          onChange={this.handleUserChange}
        />
      </section>
    )
  }

  componentDidMount() {
    // After we mount, we'll set imperatively our react binding to DOM props
    if (this.userCardRef.current) {
      this.userCardRef.current.user = this.state.user
    }
  }

  componentDidUpdate(prevProps: {}, prevState: typeof initialState) {
    const currState = this.state

    if (currState.user === prevState.user) {
      return
    }

    // now if we wanna stay in sync with our react state and WC props we have to set it on every update... SO.MUCH.WORK....
    if (this.userCardRef.current) {
      this.userCardRef.current.user = this.state.user
    }
  }
}
```

## Listening to Custom Element events

Now let's say our `x-user-card` is stateful web-component and user can edit the users data and when he's done an event will be emitted with updated data, so parent component can react on this change accordingly (saving to DB/store...).

So again you might thought, we can use standard react event handling like following:

```tsx
<x-user-card user={this.state.user} onUserChange={this.handleUserChange} />
```

Unfortunately, this won't work. We need to handle event capturing by ourselves(imperatively), similarly as we did for non primitive data.

```tsx
```

## Wrapping WebComponent to React Component

We already demonstrated, that web-components and React can work together quite well. Although the DX is indeed not the best thing on the planet right? That's also one of the main reasons for various "flame" debates between web-component advocates (primarily from Google) and React community. "React sucks, just use the platform...". If you have plenty of free time you can read through this huge github issue opened in react repo to support better interop within JSX for custom-elements and React. [https://github.com/facebook/react/...](Link TO DO)

So what can be done until this "issue" will be resolved(if ever) within react core?

Easy. We can write React wrapper for any Custom Element. With this we will provide React consumers with top notch DX as they're used to with additional benefits provided by TypeScript.

With that said, let's write React wrapper for our `x-user-card` custom element.

```tsx
// TODO UserCardEditable Wrapper
```

```tsx
// UserCardEditable usage
```

## Wrapping React Component to WebComponent

Final thing. We described in great detail how to use web-components within our React apps. Let's say Team A is using React but Team B is using Vue. Also Team A implemented this cool component which Team B is really interested. Unfortunately both team are using different frameworks, so that's a showstopper. Not so fast cowboy. Solution is again, easy. All that needs to be done is to write a custom element wrapper for our React component, which is an opposite operation that we described so far.

Let's wrap our `Counter` React component to Custom Element for ultimate reusability/consumption within any framework/library:

```tsx
// Counter component
```

```ts
// x-counter component wc wrapper
```

---

<!--Footer-->

As always, don't hesitate to ping me if you have any questions here or on Twitter (my handle [@martin_hotell](https://twitter.com/martin_hotell)) and besides that, happy type checking folks and 'till next time! Cheers! 🖖 🌊 🏄
