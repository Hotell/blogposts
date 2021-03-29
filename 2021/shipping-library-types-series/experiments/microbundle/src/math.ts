import { logger } from './logger'
export function add(a: number, b: number) {
  logger.log(`addition of ${a} and ${b}`)
  return a + b
}

export function subtract(a: number, b: number) {
  return a - b
}

export function divide(a: number, b: number) {
  return a / b
}

export function multiply(a: number, b: number) {
  return a * b
}

export function modulo(a: number, b: number) {
  return a % b
}
