import { Injectable } from 'injection-js'
import { WithState } from '@martin_hotell/rea-di'

import { Logger } from '../core/logger.service'
import { HttpClient } from '../core/http-client.service'
import { Hero } from './hero'

type State = {
  heroes: Hero[] | null
  current: Hero | null
}
@Injectable()
export class HeroService extends WithState<State> {
  constructor(private httpClient: HttpClient, private logger: Logger) {
    super()
  }
  readonly state: State = {
    heroes: null,
    current: null,
  }

  getHeroes(): Promise<Hero[]> {
    this.logger.log('Getting heroes ...')
    return this.httpClient.get<Hero[]>('heroes').then((heroes) => {
      this.setState(() => ({
        heroes,
      }))

      return heroes
    })
  }

  getHero(id: number): Promise<Hero> {
    this.logger.log(`Getting hero with ID: ${id}...`)
    return this.httpClient.get<Hero>(`heroes/${id}`).then((hero) => {
      this.setState((prevState) => ({
        current: hero,
      }))

      return hero
    })
  }
}
