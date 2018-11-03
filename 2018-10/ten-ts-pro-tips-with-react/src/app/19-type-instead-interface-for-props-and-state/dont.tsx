import { Component } from 'react'

interface State {
  counter: number
}
interface Props {
  color: string
}

class MyComponent extends Component<Props, State> {
  /*...*/
}
