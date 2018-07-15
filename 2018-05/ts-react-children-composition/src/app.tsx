import React, { Component } from 'react'
import { Demo } from './components/demo'
import { Demo as DemoPerf } from './components/demo-perf'

import './style.css'

export class App extends Component {
  render() {
    return (
      <main>
        <h1>Type-safe Children Composition</h1>
        <Demo />
        <hr />
        <DemoPerf />
      </main>
    )
  }
}
