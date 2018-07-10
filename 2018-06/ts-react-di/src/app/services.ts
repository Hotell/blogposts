import { ReflectiveInjector, Injectable, Injector } from 'injection-js'

export class Http {}

@Injectable()
export class Service {
  constructor(private http: Http) {}
}

@Injectable()
export class Service2 {
  who = 'me'
  constructor(private injector: Injector) {}

  getService(): void {
    console.log(this.injector.get(Service) instanceof Service)
  }

  createChildInjector(): void {
    const childInjector = ReflectiveInjector.resolveAndCreate([Service], this.injector)
    console.log(childInjector.get(Service) === this.injector.get(Service))
  }
}

export const injector = ReflectiveInjector.resolveAndCreate([Service, Service2, Http])
