import { ReflectiveInjector, Injectable, Injector } from 'injection-js'
import { Logger } from './core/logger.service'

export class Http {}

@Injectable()
export class Service {
  constructor(private http: Http) {}
}

@Injectable()
export class Service2 {
  who = 'me'
  constructor(private injector: Injector, private service: Service, private logger: Logger) {}

  getService(): void {
    this.logger.log(this.injector.get(Service) instanceof Service)
  }

  createChildInjector(): void {
    const childInjector = ReflectiveInjector.resolveAndCreate([Service], this.injector)
    this.logger.log(childInjector.get(Service) === this.injector.get(Service))
  }
}

export const injector = ReflectiveInjector.resolveAndCreate([Service, Service2, Http])
