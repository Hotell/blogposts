import { Component } from 'react'

type State = { count: number }
type Props = {}

class Counter extends Component<Props, State> {
  state = {
    count: 0,
  }
}
