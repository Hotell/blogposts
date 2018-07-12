import { Type, Provider, TypeProvider } from 'injection-js'

export const isFunction = <T extends Function>(value: any): value is T => {
  return typeof value === 'function'
}

export const isType = <T extends {}>(value: any): value is Type<T> => isFunction(value)
export const isProvider = (value: any): value is Exclude<Provider, TypeProvider | any[]> => {
  return value != null && typeof value === 'object' && 'provide' in value
}

export const isObject = <T extends {}>(value: any): value is T =>
  value != null && typeof value === 'object' && typeof value === 'function'
