# React Generic Components with TypeScript

TypeScript 2.9 introduced a new compiler feature for declaring generic React components from within JSX, which adds even more type-safety and developer experience.

What do I mean by React Generic Component ?

> we will use the same Select component for all examples in this post
>
> Select is a custom input element that leverages `datalist` HTML element

**Class Component:**

```tsx
import React, { Component, SyntheticEvent } from 'react'

type Props<T> = {
  active: T
  items: T[]
  onSelect(item: T, event?: SyntheticEvent<HTMLElement>): void
}
class Select<T> extends Component<Props<T>> {
  render() {
    return <div>{...}</div>
  }
}
```

**Function Component:**

```tsx
import React, { SyntheticEvent } from 'react'

type Props<T> = {
  active: T
  items: T[]
  onSelect(item: T, event?: SyntheticEvent<HTMLElement>): void
}

const Select = <T extends {}>(props: Props<T>) => { return <div>{...}</div> }
```

With that said, you may be still asking, ok dude but why do I need to use generics for my re-usable `Select` ?

Well, re-usable === it should accept and render various data types:

- primitive ones `string[]`
- more complicated data like objects/arrays etc...

How should it be used in type-safe way?

We have some App component with static data and state:

```tsx
const data = {
  heroes: ['Hulk', 'Iron Man'],
  users: [{ name: 'Peter', age: 32 }, { name: 'John', age: 23 }],
}

class App extends Component {
  state = {
    hero: '',
    user: null,
  }
  render() {
    return (
      <>
        <Select
          active={this.hero}
          items={data.heroes}
          onSelect={(selected) => this.setState((prevState) => ({ hero: selected }))}
        />
        <Select
          active={this.user}
          items={data.users}
          onSelect={(selected) => this.setState((prevState) => ({ user: selected }))}
        />
      </>
    )
  }
}
```

Let's implement our generic **<Select />** !

### Generic <Select/>

#### 1. Defining Props

#### 2. Defining State

#### 3. Implementation

### Generic <Select/> with render prop pattern

### Summary
