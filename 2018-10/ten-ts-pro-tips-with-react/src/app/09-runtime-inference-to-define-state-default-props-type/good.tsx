import React, { Component } from 'react'

type State = typeof initialState
type Props = { someProps: string } & typeof defaultProps

const initialState = { count: 0 }
const defaultProps = { who: 'Tony Hawk' }

export class Counter extends Component<Props, State> {
  static defaultProps = defaultProps
  state = initialState

  render() {
    const { count } = this.state

    return <code>{count}</code>
  }
}
