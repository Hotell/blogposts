import React, { Component } from 'react'

import { injector, Service, Service2, Http } from './services'
import { Provider, Inject } from './inject'
import { HeroesModule } from './heroes/heroes.module'
import { Logger, LoggerConfig } from './core/logger.service'
import { HttpClient } from './core/http-client.service'
import { InjectorBoundary } from './shared/injector-boundary'

export class App extends Component {
  render() {
    return (
      <>
        <main>
          <h1>React + Angular service DI</h1>
          <Provider
            provide={[
              Service,
              Service2,
              Http,
              HttpClient,
              Logger,
              {
                provide: LoggerConfig,
                useValue: {
                  allow: true,
                },
              },
            ]}
          >
            <InjectorBoundary level={1} label="Root">
              <Child />
            </InjectorBoundary>
          </Provider>
        </main>
      </>
    )
  }
}

class Child extends Component {
  render() {
    return (
      <>
        <HeroesModule />
        <Inject providers={{ service: Service, service2: Service2, logger: Logger }}>
          {(props) => {
            return (
              <>
                <button onClick={(ev) => props.logger.log(ev.clientX, ev.clientY)}>
                  Log X Y position
                </button>
                <hr />
                <div>Hello {props.service2.who}</div>
                <button
                  onClick={() => {
                    props.logger.log(props.injector.get(Service2))
                  }}
                >
                  Get service2 instance from root injector
                </button>
                <hr />
              </>
            )
          }}
        </Inject>
        {/* Here we create child provider with it's own Service instance! */}
        <Provider provide={[Service]}>
          <InjectorBoundary level={2} label="Child">
            <h3>Child Injector</h3>
            <Inject providers={{ service: Service, service2: Service2, logger: Logger }}>
              {(props) => {
                return (
                  <>
                    <div>Hello {props.service2.who}</div>
                    <button
                      onClick={() => {
                        const childService = props.injector.get(Service)
                        const parentService = props.injector.parent!.get(Service)
                        const childService2 = props.injector.get(Service2)
                        const parentService2 = props.injector.parent!.get(Service2)
                        props.logger.log(
                          'is child and parent service equal?',
                          childService === parentService
                        )
                        props.logger.log(childService, parentService)
                        props.logger.log(
                          'is child and parent service2 equal?',
                          childService2 === parentService2
                        )
                      }}
                    >
                      Get services from parent and child injector
                    </button>
                    <hr />
                  </>
                )
              }}
            </Inject>
          </InjectorBoundary>
        </Provider>
      </>
    )
  }
}
