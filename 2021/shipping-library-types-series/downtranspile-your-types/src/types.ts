export interface Calculator {
  add: (a: number, b: number) => number
  subtract: (a: number, b: number) => number
  multiply: (a: number, b: number) => number
  divide: (a: number, b: number) => number
  modulo: (a: number, b: number) => number
}

type Pointer = { x: number; y: number }
// interface Pointer {
//   x: number
//   y: number
// }

// TS 3.4 - const assertions
const weekday = {
  monday: 1,
  tuesday: 2,
} as const

export type Weekday = typeof weekday

// TS 3.5 - Omit helper
export type PointerRestrained = Omit<Pointer, 'y'>

// TS 3.8+ - Type only import/export
export type { Pointer }

// TS 4.0 - labeled tuples
export type SomeTuple = [first: number, second: string, ...rest: Pointer[]]

// TS 4.0 - Variadic Tuple Types
export function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr
  return rest
}

// TS 4.1 - Template Literal Types
type World = 'world'

export type Greeting = `hello ${World}`
type Color = 'red' | 'blue'
type Quantity = 'one' | 'two'
export type SeussFish = `${Quantity | Color} fish`

export interface Misc {
  fish: `${Quantity | Color} fish`
  greeting: `hello ${World}`
}

// TS 4.4 Symbol and Template String Pattern Index Signatures
interface Options {
  width?: number
  height?: number
}

interface OptionsWithDataProps extends Options {
  // Permit any property starting with 'data-'.
  [optName: `data-${string}`]: unknown
}
let b: OptionsWithDataProps = {
  width: 100,
  height: 100,
  'data-blah': true,

  // Fails for a property which is not known, nor
  // starts with 'data-'
  // "unknown-property": true,
}

// TS 4.1 - Key Remapping in Mapped Types
type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, 'kind'>]: T[K]
}

interface Circle {
  kind: 'circle'
  radius: number
}

export type KindlessCircle = RemoveKindField<Circle>

// TS 4.2 - spread in tuples anywhere
export type TupleWithSpreadInside = [boolean, ...string[], boolean]

// TS 4.5  Awaited helper
export type Aawaited = Awaited<Promise<string>>
export type Bawaited = Awaited<Promise<Promise<number>>>
export type Cawaited = Awaited<boolean | Promise<number>>

type NativeAwaited<T> = T extends null | undefined
  ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
  : T extends object & { then(onfulfilled: infer F): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
  ? F extends (value: infer V, ...args: any) => any // if the argument to `then` is callable, extracts the first argument
    ? NativeAwaited<V> // recursively unwrap the value
    : never // the argument to `then` was not callable
  : T // non-object or non-thenable
