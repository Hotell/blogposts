import React, { Component } from 'react'
import { Demo } from './components/demo'

import './style.css'

export class App extends Component {
  render() {
    return (
      <main>
        <h1>Type-safe Children Composition</h1>
        <Demo />
      </main>
    )
  }
}
