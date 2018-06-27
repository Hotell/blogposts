# React Generic Components with TypeScript 2.9

TypeScript 2.9 introduced a new compiler feature for declaring generic React components from within JSX, which adds even more type-safety and developer experience.

What do I mean by React Generic Component ?

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
