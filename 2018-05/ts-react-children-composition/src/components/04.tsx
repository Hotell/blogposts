import { Component, ReactNode } from 'react'

// (1)
type Props = {
  onToggle: (on: boolean) => void
  children: (api: API) => ReactNode
}
// (2)
type API = ReturnType<Toggle['getApi']>

// (3)
type State = Readonly<typeof initialState>
const initialState = { on: false }

export class Toggle extends Component<Props, State> {
  // (4)
  readonly state = initialState
  // (5)
  private toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  // (6)
  private getApi() {
    return {
      on: this.state.on,
      toggle: this.toggle,
    }
  }
  render() {
    const { children } = this.props

    // (7)
    if (!isFunction(children)) {
      throw new Error('children is mandatory and needs to be a function!')
    }

    // (8)
    return children(this.getApi())
  }
}

const isFunction = <T extends Function>(value: any): value is T =>
  typeof value === 'function'

/* declare const foo: ((who: string) => boolean) | string

if (isFunction(foo)) {
  foo('asfas')
} else {
  foo
} */
