import { Component } from 'react'

const initialState = {
  count: 0,
}

const defaultProps = {
  color: 'red',
}

type State = typeof initialState
type Props = { count?: number } & typeof defaultProps

class Counter extends Component<Props, State> {
  static defaultProps = defaultProps
  state = initialState
}
