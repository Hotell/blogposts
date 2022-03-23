import { Calculator } from './math'
import { Logger } from './logger'

const environment = {
  isProduction: process.env.NODE_ENV === 'production',
}

export const logger = Logger(environment)
export const calc = Calculator(logger)
export { Logger } from './logger'
export { Calculator } from './math'
export * from './types'
