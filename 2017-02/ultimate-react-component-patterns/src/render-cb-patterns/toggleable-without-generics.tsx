import React, { Component, MouseEvent, ComponentType, ReactNode } from 'react'

import { isFunction, getHocComponentName } from '../utils'

const initialState = { show: false }
const defaultProps = { props: {} as { [name: string]: any } }

type State = Readonly<typeof initialState>
type Props = Partial<
  {
    children: RenderCallback | ReactNode
    render: RenderCallback
    component: ComponentType<ToggleableComponentProps<any>>
  } & DefaultProps
>
type DefaultProps = typeof defaultProps
type RenderCallback = (args: ToggleableComponentProps) => JSX.Element
export type ToggleableComponentProps<P extends object = object> = {
  show: State['show']
  toggle: Toggleable['toggle']
} & P

export class Toggleable extends Component<Props, State> {
  static readonly defaultProps: Props = defaultProps
  readonly state: State = initialState

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
