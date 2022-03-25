export function Logger(env: { isProduction: boolean }) {
  return {
    log: (...args: unknown[]) => {
      !env.isProduction && console.log(...args)
    },
  }
}

export type Logger = ReturnType<typeof Logger>
