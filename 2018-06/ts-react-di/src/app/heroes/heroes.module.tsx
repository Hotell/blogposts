import React, { Component } from 'react'

import { Heroes } from './components/heroes'
import { Provider } from '../inject'
import { HeroService } from './hero.service'
import { Logger, LoggerConfig } from '../core/logger.service'
import { EnhancedLogger } from '../core/enhanced-logger.service'

export class HeroesModule extends Component {
  render() {
    return (
      <Provider provide={[HeroService]}>
        <Heroes />
      </Provider>
    )
  }
}
