import { Component } from 'react'

const initialState = {
  count: 0,
}

type State = typeof initialState

export class Counter extends Component<{}, State> {
  render() {
    return null
  }
}
