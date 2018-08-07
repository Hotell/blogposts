import React, {
  ComponentType,
  Component,
  ReactNode,
  ComponentClass,
  forwardRef,
  RefObject,
  SFC,
  RefForwardingComponent,
  createRef,
} from 'react'
import { Omit, Constructor } from './types'

type InjectedProps = {}

{
  const logProps = <OriginalProps extends InjectedProps>(
    WrappedComponent: ComponentType<OriginalProps>
  ) => {
    type Props = OriginalProps & {}
    class LogProps extends Component<Props> {
      componentDidUpdate(prevProps: Props) {
        console.log('old props:', prevProps)
        console.log('new props:', this.props)
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    return LogProps
  }
}

// (1)
// our Hoc will consist of 2 Generic arguments that's gonna be need to set imperatively as TS cannot infer those unfortunately
// T - our component instance type that's gonna be set via ref forwarding.
// OriginalProps - Wrapped component props
const withPropsLogger = <T extends Component, OriginalProps extends {}>(
  WrappedComponent: ComponentClass<OriginalProps>
) => {
  // (2)
  // We create PrivateProps type
  type PrivateProps = { forwardedRef: RefObject<T> }
  // (3)
  // Now our HoC component props will consist of both Original and Private
  type Props = OriginalProps & PrivateProps

  // (4)
  // Our HoC implementation
  class WithPropsLogger extends Component<Props> {
    componentDidUpdate(prevProps: Props) {
      console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    render() {
      const {
        forwardedRef,
        // we create temp variable to store runtime ...rest values from this.props
        ...restPropsTmp
      } = this.props as PrivateProps
      // now we cast our rest props to proper type
      // 👉 all of this is unfortunately needed because TS issue with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
      const rest = restPropsTmp as OriginalProps

      // Assign the custom prop "forwardedRef" as a ref
      return <WrappedComponent ref={forwardedRef} {...rest} />
    }
  }

  // (5)
  // We create RefForwardingFactory which will be passed to forwardRef
  // We need to do this because in the end we will need to turn of type checking for the implementation and make source of truth `forwardRef` generic arguments
  const RefForwardingFactory = (props: Props, ref: T) => (
    <WithPropsLogger {...props} forwardedRef={ref} />
  )

  // (6)
  // finally we return our HoC with forwarding refs capabilities
  // type checking needs to be turned on for RefForwardingFactory as our type output is handled by forwardRef<T, OriginalProps>
  return forwardRef<T, OriginalProps>(RefForwardingFactory as any)
}

type FancyButtonProps = {
  label: string
  type: 'submit' | 'button'
  onClick: () => any
}
class FancyButton extends Component<FancyButtonProps> {
  myRef = createRef<HTMLButtonElement>()
  focus() {
    if (this.myRef.current) {
      this.myRef.current.focus()
    }
  }

  // ...
  render() {
    const { label, type, onClick } = this.props
    return (
      <button
        className="FancyButton"
        type={type}
        onClick={onClick}
        ref={this.myRef}
      >
        {label}
      </button>
    )
  }
}

// Rather than exporting FancyButton, we export LogProps.
// It will render a FancyButton though.
const EnhancedFancyButton = withPropsLogger<FancyButton, FancyButtonProps>(
  FancyButton
)

const App = () => {
  const ref = React.createRef<FancyButton>()
  const handleClick = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  // The FancyButton component we imported is the WithPropsLogger HOC.
  // Even though the rendered output will be the same,
  // Our ref will now correctly point to FancyButton instead of the inner WithPropsLogger component!
  // This means we can call e.g. ref.current.focus()
  return (
    <EnhancedFancyButton
      label="Click Me"
      type="button"
      onClick={handleClick}
      ref={ref}
    />
  )
}
