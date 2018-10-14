import React, { Component } from 'react'

const _handleChange = Symbol('handleChange')

class App extends Component {
  [_handleChange] = (ev: import('react').ChangeEvent) => {}
  render() {
    return (
      <div>
        <input onChange={this[_handleChange]} />
      </div>
    )
  }
}
