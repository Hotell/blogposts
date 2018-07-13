import { ReflectiveInjector, Type } from 'injection-js'
import React, { Component, ReactNode } from 'react'

import { Context, ContextApi } from './context'

type InjectProps<T extends ProvidersMap> = {
  providers: T
  children: (resolvedInjectables: ResolvedInjectables<T>) => ReactNode
}
type ProvidersMap<T = any> = { [key: string]: Type<T> }
type ResolvedInjectables<T extends ProvidersMap> = { [P in keyof T]: T[P]['prototype'] } & {
  injector: ReflectiveInjector
}
export class Inject<T extends ProvidersMap> extends Component<InjectProps<T>> {
  private injectMappedProviders = ({ injector }: ContextApi) => {
    const keysMapNames = Object.keys(this.props.providers)
    const injectables = keysMapNames.reduce(
      (acc, nextKey) => {
        const injectableRef = this.props.providers[nextKey]
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
