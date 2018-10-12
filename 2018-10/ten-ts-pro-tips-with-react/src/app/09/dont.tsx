import React, { Component } from 'react'

type State = { count: number }
type Props = { someProps: string } & DefaultProps
type DefaultProps = { who: string }

export class Counter extends Component<Props, State> {
  static defaultProps: DefaultProps = { who: 'Johnny 5' }
  state = {
    count: 0,
  }

  render() {
    const { count } = this.state
    return <code>{count}</code>
  }
}
