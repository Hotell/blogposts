import React, { Component, MouseEvent, ComponentType, ReactNode } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { isFunction, getHocComponentName } from '../utils'

const initialState = { show: false }
const defaultProps = initialState
type State = Readonly<typeof initialState>
type Props<R extends {} = {}> = {
  children?: RenderCallback | ReactNode
  render?: RenderCallback
  component?: ComponentType<ToggleableComponentProps<R>>
  props?: R
} & OwnProps
type OwnProps = Partial<Pick<State, 'show'>>

type ToggleableComponentProps<T = {}> = { show: State['show']; toggle: Toggleable['toggle'] } & T

type RenderCallback = (args: ToggleableComponentProps) => JSX.Element

export class Toggleable<T = {}> extends Component<Props<T>, State> {
  static ofType<T>() {
    return (Toggleable as any) as new () => Toggleable<T>
  }
  static readonly defaultProps: Props = defaultProps
  state: State = { show: this.props.show! }

  componentWillReceiveProps(nextProps: Props<T>, nextContext: any) {
    const currentProps = this.props

    if (nextProps.show !== currentProps.show) {
      this.setState({ show: Boolean(nextProps.show) })
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
  private toggle = (event: MouseEvent<HTMLElement>) => this.setState(updateShowState)
}

const updateShowState = (prevState: State) => ({ show: !prevState.show })

////

export type InjectedProps = ToggleableComponentProps

export const withToogleable = <OriginalProps extends object>(
  UnwrappedComponent: ComponentType<OriginalProps & InjectedProps>
) => {
  type Props = Omit<OriginalProps, keyof InjectedProps> & OwnProps
  class WithToggleable extends Component<Props> {
    static displayName = getHocComponentName(WithToggleable.displayName, UnwrappedComponent)
    static WrappedComponent = UnwrappedComponent
    render() {
      const { show, ...rest } = this.props

      return <Toggleable show={show} render={renderProps => <UnwrappedComponent {...rest} {...renderProps} />} />
    }
  }

  return hoistNonReactStatics(WithToggleable, UnwrappedComponent as any) as ComponentType<Props>
}
