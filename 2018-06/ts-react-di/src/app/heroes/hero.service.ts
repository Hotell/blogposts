import { Injectable } from 'injection-js'

import { HEROES } from './mock-heroes'
import { Logger } from '../core/logger.service'

@Injectable()
export class HeroService {
  constructor(private logger: Logger) {}
  getHeroes() {
    this.logger.log('Getting heroes ...')
    return HEROES
  }
}
