import { StateCallback } from 'lib/rea-di/types'

export abstract class WithState<T extends object> {
  protected abstract state: null | Readonly<T> = null
  protected setState(stateFn: StateCallback<T>) {
    const newState = {
      ...(this.state as object),
      ...(stateFn(this.state as T) as object),
    } as T

    // console.log({ newState })
    this.state = newState

    return this.state
  }
}
