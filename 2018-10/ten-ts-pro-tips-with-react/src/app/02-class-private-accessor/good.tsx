import React, { Component } from 'react'

class App extends Component {
  _handleChange = (ev: import('react').ChangeEvent) => {}
  render() {
    return (
      <div>
        <input onChange={this._handleChange} />
      </div>
    )
  }
}
