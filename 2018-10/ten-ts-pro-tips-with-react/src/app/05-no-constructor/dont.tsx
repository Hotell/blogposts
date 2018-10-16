import { Component } from 'react'

type State = { count: 0 }
type Props = {}

class Counter extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
}
