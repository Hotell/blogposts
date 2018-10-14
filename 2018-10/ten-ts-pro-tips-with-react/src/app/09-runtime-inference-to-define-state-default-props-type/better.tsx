import React, { Component } from 'react'

type State = typeof initialState
type Props = { someProps: string } & typeof defaultProps

const initialState = Object.freeze({ count: 0 })
const defaultProps = Object.freeze({ who: 'Johnny 5' })

export class Counter extends Component<Props, State> {
  static readonly defaultProps = defaultProps
  readonly state = initialState

  render() {
    const { count } = this.state

    return <code>{count}</code>
  }
}
