import React, { Component } from 'react'

import { CounterService } from './counter.service'

type Props = {
  // count: number
  // inc: () => void
  // dec: () => void
  service: CounterService
}
export class Counter extends Component<Props> {
  // NO STATE !
  render() {
    const { service } = this.props
    return (
      <div>
        <div>
          Count: <b>{service.count}</b>
        </div>
        <button onClick={service.increment}>INC</button>
        <button onClick={service.decrement}>DEC</button>
      </div>
    )
  }
}
