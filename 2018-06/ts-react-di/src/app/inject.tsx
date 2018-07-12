import React, { Component, ReactNode, createContext, PureComponent } from 'react'
import { Type, ReflectiveInjector, Provider as ProviderConfig, Injector } from 'injection-js'

const rootInjector = ReflectiveInjector.resolveAndCreate([])
// let lastInjector: ReflectiveInjector

const Context = createContext(rootInjector)

type ProviderProps = { provide: ProviderConfig[] }
export class Provider extends Component<ProviderProps> {
  // private get injector() {
  //   if (lastInjector) {
  //     lastInjector = lastInjector.resolveAndCreateChild(this.props.provide)

  //     return lastInjector
  //   }

  //   lastInjector = rootInjector.resolveAndCreateChild(this.props.provide)

  //   return lastInjector
  // }

  private injector?: ReflectiveInjector

  render() {
    return (
      <Context.Consumer>
        {(parentInjector) => {
          this.injector = parentInjector.resolveAndCreateChild(this.props.provide)
          return <Context.Provider value={this.injector}>{this.props.children}</Context.Provider>
        }}
      </Context.Consumer>
    )
  }
}

type InjectProps<T extends ProvidersMap> = {
  providers: T
  children: (resolvedInjectables: ResolvedInjectables<T>) => ReactNode
}
type ProvidersMap<T = any> = { [key: string]: Type<T> }
type ResolvedInjectables<T extends ProvidersMap> = { [P in keyof T]: T[P]['prototype'] } & {
  injector: ReflectiveInjector
}
export class Inject<T extends ProvidersMap> extends Component<InjectProps<T>> {
  private injectMappedProviders = (injector: ReflectiveInjector) => {
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

type AsyncPipeProps<T> = {
  value: Promise<T>
  children: (api: ReturnType<AsyncPipe<T>['getApi']>) => ReactNode
}
type AsyncPipeState<T> = Readonly<{
  resolvedValue: T
  isLoading: boolean
}>
export function asyncPipe<T>(value: Promise<T>) {
  return value.then((resolved) => resolved)
}
export class AsyncPipe<T> extends PureComponent<AsyncPipeProps<T>, AsyncPipeState<T>> {
  readonly state = {
    isLoading: true,
    resolvedValue: (null as any) as T,
  }
  private getApi() {
    const { isLoading, resolvedValue: resolved } = this.state
    return {
      resolved,
      isLoading,
    }
  }
  render() {
    const { children } = this.props
    return children(this.getApi())
  }
  componentDidMount() {
    this.resolvePromise()
  }
  componentDidUpdate(prevProps: AsyncPipeProps<T>) {
    const promiseChanged = prevProps.value !== this.props.value
    if (promiseChanged) {
      this.resolvePromise()
    }
  }
  private resolvePromise() {
    this.props.value.then((resolved) => {
      this.setState({ isLoading: false, resolvedValue: resolved })
    })
  }
}
