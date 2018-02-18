import React, { Component, MouseEvent, ComponentType, ReactNode } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { isFunction } from '../utils'

type State = Readonly<{
  show: Boolean
}>
type Props<R extends {} = {}> = {
  show?: State['show']
  children?: RenderCallback | ReactNode
  render?: RenderCallback
  component?: ComponentType<ToggleableComponentProps<R>>
  props?: R
}
// type OwnProps = Omit<Props, keyof Props> & { show?: State['show'] }
type OwnProps = Pick<Props, 'show'>

type ToggleableComponentProps<T = {}> = { show: State['show']; toggle: Toggleable['toggle'] } & T

type RenderCallback = (args: ToggleableComponentProps) => JSX.Element

export class Toggleable<T = {}> extends Component<Props<T>, State> {
  static ofType<T>() {
    return (Toggleable as any) as new () => Toggleable<T>
  }
  static readonly defaultProps: Partial<Props> = {
    show: false,
  }
  state: State = { show: this.props.show! }

  componentWillReceiveProps(nextProps: Props<T>, nextContext: any) {
    const currentProps = this.props

    if (nextProps.show !== currentProps.show) {
      this.setState({ show: nextProps.show! })
    }
  }
  render() {
    const { component: InjectedComponent, children, render, props } = this.props
    const renderProps = { show: this.state.show, toggle: this.toggle }

    if (InjectedComponent) {
      return (
        <InjectedComponent {...props} {...renderProps}>
          {children}
        </InjectedComponent>
      )
    }

    if (render) {
      return render(renderProps)
    }

    return isFunction(children) ? children(renderProps) : null
  }
  private toggle = (event: MouseEvent<HTMLElement>) => this.setState(prevState => ({ show: !prevState.show }))
}

////

export type InjectedProps = { show: State['show']; toggle: Toggleable['toggle'] }

export const withToogleable = <OriginalProps extends object>(
  UnwrappedComponent: ComponentType<OriginalProps & InjectedProps>
) => {
  type Props = Omit<OriginalProps, keyof InjectedProps> & OwnProps
  class WithToggleable extends Component<Props> {
    static displayName = `WithToggleable(${UnwrappedComponent.displayName || (UnwrappedComponent as any).name})`
    static WrappedComponent = UnwrappedComponent
    render() {
      console.log({ displayName: UnwrappedComponent.displayName })
      const { show, ...rest } = this.props

      return <Toggleable show={show} render={renderProps => <UnwrappedComponent {...rest} {...renderProps} />} />
    }
  }

  return hoistNonReactStatics(WithToggleable, UnwrappedComponent as any) as ComponentType<Props>
}
