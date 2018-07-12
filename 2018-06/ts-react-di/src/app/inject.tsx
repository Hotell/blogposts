import React, { Component, ReactNode, createContext, PureComponent, ComponentType } from 'react'
import {
  Type,
  ReflectiveInjector,
  Provider as ProviderConfig,
  Injector,
  InjectionToken,
} from 'injection-js'
import { isType, isProvider, isObject } from './guards'

const rootInjector = ReflectiveInjector.resolveAndCreate([])
// let lastInjector: ReflectiveInjector

const Context = createContext(rootInjector)

type ProviderProps = { provide: ProviderConfig[] }
export class Provider extends Component<ProviderProps> {
  private static debugMode = {
    on: false,
  }
  static enableDebugMode() {
    this.debugMode.on = true
  }
  private static Debug = (props: {
    parentInjector: ReflectiveInjector
    children: ReactNode
    registeredProviders: ProviderConfig[]
    label?: string
  }) => {
    const { children, label, registeredProviders, parentInjector } = props
    if (!Provider.debugMode.on) {
      return children as JSX.Element
    }

    const isRoot = parentInjector === rootInjector
    const injectorLabel = label || isRoot ? 'Root Injector' : 'Child Injector'
    const bgColor = isRoot ? 'red' : '#388e3c'
    const styling = {
      container: { border: `2px solid ${bgColor}`, padding: '.5rem' },
      header: { backgroundColor: bgColor, padding: `.5rem .25rem` },
      title: { margin: 0, backgroundColor: bgColor },
    }

    const registeredProvidersNames: string[] = registeredProviders.reduce((acc, next) => {
      if (isType(next)) {
        return [...(acc as string[]), next.name]
      }
      if (isProvider(next)) {
        const [registrationKey] = Object.keys(next).filter((val) => val !== 'provide')
        const registrationValue = (next as { [key: string]: any })[registrationKey] as
          | Type<any>
          | object
        const providerName = {
          provide: next.provide.name ? next.provide.name : next.provide._desc,
          as: isType(registrationValue)
            ? registrationValue.name
            : JSON.stringify(registrationValue),
        }

        return [
          ...(acc as string[]),
          `{provide: ${providerName.provide}, ${registrationKey}: ${providerName.as} }`,
        ]
      }
      return acc
    }, []) as string[]

    return (
      <div style={styling.container}>
        <header style={styling.header}>
          <h4 style={styling.title}>{injectorLabel}</h4>
          <pre>
            <b>Registeted Providers:</b> {json(registeredProvidersNames)}
          </pre>
        </header>
        {children}
      </div>
    )

    function json<T>(value: T) {
      return JSON.stringify(value, null, 2)
    }
  }
  // private get injector() {
  //   if (lastInjector) {
  //     lastInjector = lastInjector.resolveAndCreateChild(this.props.provide)

  //     return lastInjector
  //   }

  //   lastInjector = rootInjector.resolveAndCreateChild(this.props.provide)

  //   return lastInjector
  // }

  injector?: ReflectiveInjector

  render() {
    return (
      <Context.Consumer>
        {(parentInjector) => {
          this.injector = parentInjector.resolveAndCreateChild(this.props.provide)

          if (Provider.debugMode.on) {
            return (
              <Context.Provider value={this.injector}>
                <Provider.Debug
                  parentInjector={parentInjector}
                  registeredProviders={this.props.provide}
                >
                  {this.props.children}
                </Provider.Debug>
              </Context.Provider>
            )
          }

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
export function asyncPipe<T>(value: Promise<T>, componentInstance: Component) {
  return value.then((resolved) => {
    componentInstance.forceUpdate(() => {
      console.log('force update')
    })
    return resolved
  })
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
    // console.log('render with', this.getApi())
    const { children } = this.props
    return children(this.getApi())
  }
  componentDidMount() {
    this.resolvePromise()
  }
  // componentDidUpdate(prevProps: AsyncPipeProps<T>) {
  //   const promiseChanged = prevProps.value !== this.props.value
  //   console.log('componentDidUpdate changed?', promiseChanged)
  //   if (promiseChanged) {
  //     this.setState(() => ({ isLoading: true }), () => this.resolvePromise())
  //   }
  // }
  private resolvePromise() {
    this.props.value.then((resolved) => {
      this.setState((prevState) => ({ isLoading: false, resolvedValue: resolved }))
    })
  }
}
