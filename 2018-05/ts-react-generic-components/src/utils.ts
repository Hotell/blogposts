export const isObject = <T>(value: T): value is T extends object ? T : never =>
  isPresent(value) && isJsLikeObject(value) && !isFunction(value) && !isArray(value)

export const isJsLikeObject = <T extends object>(value: any): value is T =>
  typeof value === 'object'
export const isBlank = <T>(value: any): value is T extends undefined | null ? T : never =>
  value == null

export const isPresent = <T>(value: any): value is T extends undefined | null ? never : T =>
  value != null

export const isFunction = <T extends Function>(value: any): value is T =>
  typeof value === 'function'

export const isArray = <T>(value: any): value is Array<any> => Array.isArray(value)
export const isString = <T>(value: T): value is T extends string ? T : never =>
  typeof value === 'string'
