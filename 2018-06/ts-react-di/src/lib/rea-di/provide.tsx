import { ReflectiveInjector, Provider as ProviderConfig, Type } from 'injection-js'
import React, { createContext, PureComponent, ReactNode } from 'react'

import { isType, isProvider } from './guards'
import { StateCallback } from './types'
import { rootInjector, Context, ContextApi } from './context'

type Props = { provide: ProviderConfig[] }
type State = ContextApi
export class Provider extends PureComponent<Props, State> {
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

  private injector?: ReflectiveInjector
  readonly state: State = {} as State
  private providersRegistered = false

  private monkeyPatchStateProviders(injector: ReflectiveInjector, providers: ProviderConfig[]) {
    type TypeWithState = Type<any> & { setState: (...args: any[]) => any }

    providers.reduce((acc, next) => {
      let stateKey: string
      let provideClass!: TypeWithState
      if (isType(next)) {
        stateKey = next.name
        provideClass = next as TypeWithState
      }
      if (isProvider(next)) {
        const { provide } = next
        stateKey = provide.name
        provideClass = provide
      }

      const hasState = isType(provideClass) && 'setState' in provideClass.prototype

      if (hasState) {
        // console.log('HAS STATE')
        const instance = injector.get(provideClass)
        const originalSetStateFn = instance.setState.bind(instance)

        const newSetStateFn = (state: StateCallback) => {
          // call service setState
          const newState = originalSetStateFn(state) as object

          // update context provider state
          this.setState(
            (prevState) => {
              return { [stateKey]: newState }
            }
            // () => originalSetStateFn(state)
          )
        }

        instance.setState = newSetStateFn
      }

      return acc
    }, {})
  }

  private get contextApi(): ContextApi {
    return {
      injector: this.injector,
      ...this.state,
    }
  }
  private renderProvider = ({ injector: parentInjector }: ContextApi) => {
    // private renderProvider = (parentInjector: ReflectiveInjector) => {
    this.injector = this.injector || parentInjector.resolveAndCreateChild(this.props.provide)

    if (!this.providersRegistered) {
      this.monkeyPatchStateProviders(this.injector, this.props.provide)
    }
    this.providersRegistered = true

    if (Provider.debugMode.on) {
      return (
        <Context.Provider value={this.contextApi}>
          <Provider.Debug parentInjector={parentInjector} registeredProviders={this.props.provide}>
            {this.props.children}
          </Provider.Debug>
        </Context.Provider>
      )
    }

    return <Context.Provider value={this.contextApi}>{this.props.children}</Context.Provider>
  }

  render() {
    return <Context.Consumer>{this.renderProvider}</Context.Consumer>
  }
}
