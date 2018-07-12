import React, { Component } from 'react'

import { Heroes } from './components/heroes'
import { Provider } from '../inject'
import { HeroService } from './hero.service'
import { Logger } from '../core/logger.service'
import { EnhancedLogger } from '../core/enhanced-logger.service'
import { InjectorBoundary } from '../shared/injector-boundary'

export class HeroesModule extends Component {
  render() {
    return (
      <Provider provide={[HeroService, { provide: Logger, useClass: EnhancedLogger }]}>
        <Heroes />
      </Provider>
    )
  }
}
