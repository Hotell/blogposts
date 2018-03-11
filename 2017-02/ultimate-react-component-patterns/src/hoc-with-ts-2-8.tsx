import * as React from 'react'
import { ComponentType, Component } from 'react'

type T02 = Omit<{ name: string; age: number; isLoading: boolean }, keyof { isLoading: boolean }>
type T03 = Exclude<{ isLoading: boolean }, { name: string; age: number; isLoading: boolean }>

type InjectedProps = {
  isLoading: boolean
}
type ExternalProps = {}

const withLoading = <OriginalProps extends object>(
  Cmp: ComponentType<OriginalProps & InjectedProps>
) => {
  // type InternalProps = Omit<OriginalProps, keyof InternalState>
  type InternalProps = Omit<OriginalProps, keyof InternalState> & ExternalProps
  type InternalState = { isLoading: boolean }
  class WithLoading extends Component<InternalProps, InternalState> {
    static displayName = `WithLoadinng(${Cmp.displayName})`
    state = {
      isLoading: false,
    }

    render() {
      const { isLoading } = this.state
      const {} = this.props
      const ownProps = { isLoading }
      return isLoading ? <>Loading...</> : <Cmp {...this.props} {...ownProps} />
    }
  }

  return WithLoading
}

class User extends Component<{ name: string; age: number } & InjectedProps> {
  render() {
    const { age, name } = this.props
    return (
      <>
        - name: {name}
        - age: {age}
      </>
    )
  }
}

const EnhancedUser = withLoading(User)

////

const App = () => (
  <>
    <EnhancedUser name="sd" age={21} />
    <User name="Martin" age={31} isLoading />
  </>
)
