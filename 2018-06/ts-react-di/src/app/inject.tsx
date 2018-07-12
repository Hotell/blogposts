import React, { Component, ReactNode, createContext } from 'react'
import { Type, ReflectiveInjector, Provider as ProviderConfig } from 'injection-js'

const rootInjector = ReflectiveInjector.resolveAndCreate([])
let lastInjector: ReflectiveInjector

const Context = createContext(rootInjector)

type ProviderProps = { provide: ProviderConfig[] }
export class Provider extends Component<ProviderProps> {
  private get injector() {
    if (lastInjector) {
      lastInjector = lastInjector.resolveAndCreateChild(this.props.provide)

      return lastInjector
    }

    lastInjector = rootInjector.resolveAndCreateChild(this.props.provide)

    return lastInjector
  }

  render() {
    return <Context.Provider value={this.injector}>{this.props.children}</Context.Provider>
  }
}

type InjectProps<T extends ProvidersMap> = {
  injectablesMap: T
  children: (resolvedInjectables: ResolvedInjectables<T>) => ReactNode
}
type ProvidersMap<T = any> = { [key: string]: Type<T> }
type ResolvedInjectables<T extends ProvidersMap> = { [P in keyof T]: T[P]['prototype'] } & {
  injector: ReflectiveInjector
}
export class Inject<T extends ProvidersMap> extends Component<InjectProps<T>> {
  private injectMappedProviders = (injector: ReflectiveInjector) => {
    const keysMapNames = Object.keys(this.props.injectablesMap)
    const injectables = keysMapNames.reduce(
      (acc, nextKey) => {
        const injectableRef = this.props.injectablesMap[nextKey]
        const injectable = { [nextKey]: injector.get(injectableRef) }

        return { ...acc, ...injectable }
      },
      { injector }
    ) as ResolvedInjectables<T>

    return this.props.children(injectables)
  }
  render() {
    return <Context.Consumer>{this.injectMappedProviders}</Context.Consumer>
  }
}
