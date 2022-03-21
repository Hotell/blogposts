const environment = {
  isProduction: process.env.NODE_ENV === 'production',
}
export function Logger(env: typeof environment) {
  return {
    log: (...args: unknown[]) => {
      !env.isProduction && console.log(...args)
    },
  }
}

export const logger = Logger(environment)
