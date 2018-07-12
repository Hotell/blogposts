import { Injectable } from 'injection-js'

import { Logger } from '../core/logger.service'
import { HttpClient } from '../core/http-client.service'
import { Hero } from './hero'

@Injectable()
export class HeroService {
  constructor(private httpClient: HttpClient, private logger: Logger) {}
  getHeroes(): Promise<Hero[]> {
    this.logger.log('Getting heroes ...')
    return this.httpClient.get('heroes')
  }

  getHero(id: number): Promise<Hero> {
    this.logger.log(`Getting hero with ID: ${id}...`)
    return this.httpClient.get(`heroes/${id}`)
  }
}
