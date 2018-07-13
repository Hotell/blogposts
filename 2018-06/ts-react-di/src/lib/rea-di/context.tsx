import { ReflectiveInjector } from 'injection-js'
import { createContext } from 'react'

export const rootInjector = ReflectiveInjector.resolveAndCreate([])

export type ContextApi = {
  injector: ReflectiveInjector
  [providerName: string]: any
}

export const Context = createContext<ContextApi>({ injector: rootInjector })
