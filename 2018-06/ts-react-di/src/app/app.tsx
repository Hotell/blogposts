import React, { Component } from 'react'

import { injector, Service, Service2, Http } from './services'
import { Provider, Inject } from './inject'

export class App extends Component {
  render() {
    return (
      <Provider value={[Service, Service2, Http]}>
        <main>
          <h1>Hello World</h1>
          <Child />
        </main>
      </Provider>
    )
  }
  componentDidMount() {
    console.log(injector.get(Service) instanceof Service)
    console.log(injector.get(Service2))
  }
}

class Child extends Component {
  render() {
    return (
      <Inject injectables={{ service: Service, service2: Service2 }}>
        {(props) => {
          return <div>Hello {props.service2.who}</div>
        }}
      </Inject>
    )
  }
}
