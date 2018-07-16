import { Injectable } from 'injection-js'
import { WithState } from '@martin_hotell/rea-di'

import { Logger } from '../core/logger.service'

type State = Readonly<{ count: number }>

@Injectable()
export class CounterService extends WithState<State> {
  constructor(private logger: Logger) {
    super()
  }
  protected readonly state: State = {
    count: 0,
  }

  get count() {
    return this.state.count
  }

  increment = () => {
    this.logger.log('service#increment called')
    this.setState((prevState) => ({ count: prevState.count + 1 }))
  }
  decrement = () => {
    this.logger.log('service#decrement called')
    this.setState((prevState) => ({ count: prevState.count - 1 }))
  }
}
