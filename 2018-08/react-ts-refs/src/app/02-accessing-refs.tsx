import React, { Component } from 'react'

class MyComponent extends Component {
  private myRef = React.createRef<HTMLDivElement>()
  render() {
    return <div ref={this.myRef} />
  }

  focus() {
    const node = this.myRef.current

    node.focus()
  }
}

{
  // FIX
  class MyComponent extends Component {
    private myRef = React.createRef<HTMLDivElement>()
    render() {
      return <div ref={this.myRef} />
    }

    focus() {
      const node = this.myRef.current
      if (node) {
        node.focus()
      }
    }
  }
}
