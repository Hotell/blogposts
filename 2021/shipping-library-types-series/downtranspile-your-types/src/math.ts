import { type Logger } from './logger'
import type { Calculator } from './types'

export function Calculator(logger: Logger): Calculator {
  function add(a: number, b: number) {
    logger.log('add')
    return a + b
  }

  function subtract(a: number, b: number) {
    return a - b
  }

  function divide(a: number, b: number) {
    return a / b
  }

  function multiply(a: number, b: number) {
    return a * b
  }

  function modulo(a: number, b: number) {
    return a % b
  }

  return { add, subtract, divide, multiply, modulo }
}
