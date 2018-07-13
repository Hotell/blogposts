import React, { Component } from 'react'
import { Provider as ProviderType } from 'injection-js'
import { Inject, Provider } from 'lib/rea-di'
import { CounterService } from './counter.service'
import { Counter } from './counter'
import { Logger } from '../core/logger.service'
import { EnhancedLogger } from '../core/enhanced-logger.service'

export class CounterModule extends Component {
  render() {
    return (
      <>
        <Provider provide={[CounterService, { provide: Logger, useClass: EnhancedLogger }]}>
          <Inject providers={{ counterService: CounterService }}>
            {({ counterService }) => {
              return <Counter service={counterService} />
            }}
          </Inject>
        </Provider>
      </>
    )
  }
}
