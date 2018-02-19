import React, { ComponentType, Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { getHocComponentName } from '../utils'

import {
  Toggleable,
  Props as ToggleableProps,
  ToggleableComponentProps as InjectedProps,
} from './toggleable'

// OwnProps is for any public props that should be available on internal Component.props
// and for WrappedComponent
type OwnProps = Pick<ToggleableProps, 'show'>

export const withToogleable = <OriginalProps extends object>(
  UnwrappedComponent: ComponentType<OriginalProps & InjectedProps>
) => {
  // we are leveraging TS 2.8 conditional mapped types to get proper final prop types
  type Props = Omit<OriginalProps, keyof InjectedProps> & OwnProps
  class WithToggleable extends Component<Props> {
    static readonly displayName = getHocComponentName(
      WithToggleable.displayName,
      UnwrappedComponent
    )
    static readonly WrappedComponent = UnwrappedComponent
    render() {
      const { show, ...rest } = this.props

      return (
        <Toggleable
          show={show}
          render={renderProps => <UnwrappedComponent {...rest} {...renderProps} />}
        />
      )
    }
  }

  return hoistNonReactStatics(WithToggleable, UnwrappedComponent as any) as ComponentType<Props>
}
