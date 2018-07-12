import { Injectable, Optional, InjectionToken, Inject } from 'injection-js'

export const LoggerConfig = new InjectionToken('LoggerConfig')
type Config = typeof defaultConfig
const defaultConfig = {
  allow: true,
}

@Injectable()
export class Logger {
  constructor(
    @Optional()
    @Inject(LoggerConfig)
    private config: Config
  ) {
    if (!config) {
      this.config = defaultConfig
    }
  }
  logs: string[] = [] // capture logs for testing
  log(...message: {}[]) {
    this.logs.push(String(message))
    if (this.config.allow) {
      console.log(...message)
    }
  }
}
