import { Provider } from '@martin_hotell/rea-di'
import React, { Component } from 'react'

import { EnhancedLogger } from '../core/enhanced-logger.service'
import { Logger } from '../core/logger.service'
import { Heroes } from './components/heroes'
import { HeroService } from './hero.service'

export class HeroesModule extends Component {
  render() {
    return (
      <Provider provide={[HeroService, { provide: Logger, useClass: EnhancedLogger }]}>
        <Heroes />
      </Provider>
    )
  }
}
