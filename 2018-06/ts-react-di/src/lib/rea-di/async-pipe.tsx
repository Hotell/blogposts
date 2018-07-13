import { PureComponent, ReactNode, Component } from 'react'

type Props<T> = {
  value: Promise<T>
  children: (api: ReturnType<AsyncPipe<T>['getApi']>) => ReactNode
}
type State<T> = Readonly<{
  resolvedValue: T
  isLoading: boolean
}>
export function asyncPipe<T>(value: Promise<T>, componentInstance: Component) {
  return value.then((resolved) => {
    componentInstance.forceUpdate(() => {
      console.log('force update')
    })
    return resolved
  })
}

export class AsyncPipe<T> extends PureComponent<Props<T>, State<T>> {
  readonly state = {
    isLoading: true,
    resolvedValue: (null as any) as T,
  }
  private getApi() {
    const { isLoading, resolvedValue: resolved } = this.state
    return {
      resolved,
      isLoading,
    }
  }
  render() {
    // console.log('render with', this.getApi())
    const { children } = this.props
    return children(this.getApi())
  }
  componentDidMount() {
    this.resolvePromise()
  }
  // componentDidUpdate(prevProps: AsyncPipeProps<T>) {
  //   const promiseChanged = prevProps.value !== this.props.value
  //   console.log('componentDidUpdate changed?', promiseChanged)
  //   if (promiseChanged) {
  //     this.setState(() => ({ isLoading: true }), () => this.resolvePromise())
  //   }
  // }
  private resolvePromise() {
    this.props.value.then((resolved) => {
      this.setState((prevState) => ({ isLoading: false, resolvedValue: resolved }))
    })
  }
}
