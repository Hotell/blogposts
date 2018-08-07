import React, { Component } from 'react'

class AutoFocusTextInput extends Component {
  textInput = React.createRef<MyComponent>()

  componentDidMount() {
    this.textInput.current!.focus()
  }

  render() {
    return <MyComponent ref={this.textInput} />
  }
}

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
