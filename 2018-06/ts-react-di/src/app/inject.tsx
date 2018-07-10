import React, { Component, ReactNode, createContext } from 'react'
import { Type, ReflectiveInjector } from 'injection-js'

const Context = createContext<ReflectiveInjector>(null as any)

type ProviderProps = { value: Type<any>[] }
export class Provider extends Component<ProviderProps> {
  private injector = ReflectiveInjector.resolveAndCreate(this.props.value)
  render() {
    return <Context.Provider value={this.injector}>{this.props.children}</Context.Provider>
  }
}

type InjectProps<T extends { [key: string]: Type<any> }> = {
  injectables: T
  children: (resolvedInjectables: { [P in keyof T]: T[P]['prototype'] }) => ReactNode
}
export class Inject<T extends { [key: string]: Type<any> }> extends Component<InjectProps<T>> {
  render() {
    return (
      <Context.Consumer>
        {(injector) => {
          const keysMapNames = Object.keys(this.props.injectables)
          const injectables = keysMapNames.reduce((acc, nextKey) => {
            const injectableRef = this.props.injectables[nextKey]
            const injectable = { [nextKey]: injector.get(injectableRef) }

            return { ...acc, ...injectable }
          }, {}) as { [P in keyof T]: T[P] }

          return this.props.children(injectables)
        }}
      </Context.Consumer>
    )
  }
}
