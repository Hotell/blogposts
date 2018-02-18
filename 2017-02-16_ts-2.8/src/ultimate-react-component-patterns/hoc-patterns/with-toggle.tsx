import React, { Component, ComponentType, SyntheticEvent, MouseEvent } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { getComponentName, getHocComponentName } from '../utils'

type State = {
  show: boolean
}
type OwnProps = object

type InjectedProps = {
  onClick(event: MouseEvent<HTMLElement>): void
}

export function withToggle<OriginalProps>(UnwrappedComponent: ComponentType<OriginalProps & InjectedProps>) {
  // type InternalProps = Props & Omit<OriginalProps, keyof InjectedProps>
  // type Props = Exclude<OriginalProps, InjectedProps> & OwnProps
  type Props = Omit<OriginalProps, keyof InjectedProps> & OwnProps
  class WithToggle extends Component<Props, State> {
    static displayName = getHocComponentName(WithToggle.displayName, UnwrappedComponent)
    static WrappedComponent = UnwrappedComponent
    state = { show: false }
    render() {
      const { show } = this.state
      const { children, ...rest } = this.props
      return (
        <>
          <UnwrappedComponent {...rest} onClick={this.toggle} />
          {show ? children : null}
        </>
      )
    }
    private toggle = (event: MouseEvent<HTMLElement>) => this.setState(prevState => ({ show: !prevState.show }))
  }

  return hoistNonReactStatics(WithToggle, UnwrappedComponent as any) as ComponentType<Props>
}

export { InjectedProps as WithToggleInjectedProps }
