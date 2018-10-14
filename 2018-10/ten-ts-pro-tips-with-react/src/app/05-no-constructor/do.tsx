import { Component } from 'react'

type State = { counter: number }
type Props = {}

class App extends Component<Props, State> {
  state = {
    counter: 0,
  }
}
