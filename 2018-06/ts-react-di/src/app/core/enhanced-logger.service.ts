import { Logger } from './logger.service'

export class EnhancedLogger extends Logger {
  log(...message: {}[]) {
    this.logs.push(String(message))
    if (this.config.allow) {
      console.log('%c%s', styles, ...message)
    }
  }
}

const styles = `
  color: blue;
  background-color: yellow;
  font-size: large
`
