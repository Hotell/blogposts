import { Type } from 'injection-js'

export const isFunction = <T extends Function>(value: any): value is T => {
  return typeof value === 'function'
}

export const isType = <T extends {}>(value: any): value is Type<T> => isFunction(value)
