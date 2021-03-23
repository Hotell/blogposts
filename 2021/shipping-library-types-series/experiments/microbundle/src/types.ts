export interface Calculator {
  add: (a: number, b: number) => number
  subtract: (a: number, b: number) => number
  multiply: (a: number, b: number) => number
  divide: (a: number, b: number) => number
  modulo: (a: number, b: number) => number
}

interface Pointer {
  x: number
  y: number
}

export type {Pointer}
