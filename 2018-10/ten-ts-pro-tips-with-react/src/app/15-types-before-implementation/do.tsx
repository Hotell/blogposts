import { Component } from 'react'

type State = typeof initialState
type Props = { count?: number } & typeof defaultProps

const initialState = {
  count: 0,
}
const defaultProps = {
  color: 'red',
}
class Counter extends Component<Props, State> {
  static defaultProps = defaultProps
  state = initialState
}
