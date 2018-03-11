import React, { Component, MouseEvent, ComponentType, ReactNode } from 'react'

import { isFunction, getHocComponentName } from '../utils'

const initialState = { show: false }
const defaultProps: DefaultProps = { props: {} }

type State = Readonly<typeof initialState>
type Props<P extends object = object> = Partial<
  {
    children: RenderCallback | ReactNode
    render: RenderCallback
    component: ComponentType<ToggleableComponentProps<P>>
  } & DefaultProps<P>
>
type DefaultProps<P extends object = object> = { props: P }
type RenderCallback = (args: ToggleableComponentProps) => JSX.Element
export type ToggleableComponentProps<P extends object = object> = {
  show: State['show']
  toggle: Toggleable['toggle']
} & P

export class Toggleable<T extends object = object> extends Component<Props<T>, State> {
  static ofType<T extends object>() {
    return Toggleable as Constructor<Toggleable<T>>
  }
  static readonly defaultProps: Props = defaultProps
  readonly state: State = { show: this.state.show }

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

    return isFunction(children) ? children(renderProps) : new Error('asdsa()')
  }
  private toggle = (event: MouseEvent<HTMLElement>) => this.setState(updateShowState)
}

const updateShowState = (prevState: State) => ({ show: !prevState.show })
