import React, { Component, ReactChild } from 'react'
import 'papercss/dist/paper.min.css'

import { WebComponentGreeterConsumer } from './greeter-consumer'
import { WebComponentUserCardConsumer } from './user-card-consumer'

export class App extends Component {
  render() {
    return (
      <main>
        <h3>React and WebComponents</h3>
        <WebComponentGreeterConsumer />
        <hr />
        <WebComponentUserCardConsumer />
      </main>
    )
  }
}
