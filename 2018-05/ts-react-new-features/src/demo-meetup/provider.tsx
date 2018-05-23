import React, {
  Component,
  cloneElement,
  Children,
  ReactElement,
  ComponentType,
  isValidElement,
} from 'react'

const initialState = { count: 0 }
const inc = (prevState: State): State => ({ count: prevState.count + 1 })
const dec = (prevState: State): State => ({ count: prevState.count - 1 })

type State = Readonly<typeof initialState>
type Props = {
  children: ReactElement<any> | ((props: EnhancedProps) => ReactElement<any>)
}
type EnhancedProps = Provider['propsForChild']
export class Provider extends Component<Props, State> {
  state: State = initialState

  static withEnhancedProps<P extends object>(Cmp: ComponentType<P>) {
    type PropsExcludingEnhanced = Pick<P, Exclude<keyof P, keyof EnhancedProps>>
    type RecomposedProps = PropsExcludingEnhanced

    return (Cmp as ComponentType<any>) as ComponentType<RecomposedProps>
  }
  render() {
    const { children } = this.props
    const { count } = this.state
    const childToRender =
      typeof children === 'function'
        ? children(this.propsForChild)
        : cloneElement<EnhancedProps>(Children.only(children), {
            ...this.propsForChild,
          })

    return <section>{childToRender}</section>
  }
  private get propsForChild() {
    const { count } = this.state
    return {
      count,
      onIncrement: this.handleInc,
      onDecrement: this.handleDec,
    }
  }
  private handleInc = () => {
    this.setState(inc)
  }
  private handleDec = () => {
    this.setState(dec)
  }
}
