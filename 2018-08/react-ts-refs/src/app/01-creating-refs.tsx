import React, { Component } from 'react'

class MyComponent extends Component {
  private myRef = React.createRef()
  render() {
    return <div ref={this.myRef} />
  }
}

{
  // fix TS errors
  class MyComponent extends Component {
    private myRef = React.createRef<HTMLDivElement>()
    render() {
      return <div ref={this.myRef} />
    }
  }
}
