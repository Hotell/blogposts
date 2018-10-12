import React, { Component } from 'react'

type Props = { who: string } & typeof defaultProps
const defaultProps = {
  one: 1,
  two: 'hello',
}

export class TestDefaultProps extends Component<Props> {
  static defaultProps = defaultProps
  render() {
    return <div>hello</div>
  }
}

const App = () => (
  <>
    <TestDefaultProps who="hello" />
  </>
)
