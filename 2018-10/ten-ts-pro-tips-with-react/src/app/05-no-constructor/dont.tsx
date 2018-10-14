import { Component } from 'react'

type State = { counter: 0 }
type Props = {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      counter: 0,
    }
  }
}
