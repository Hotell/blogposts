import React, { MouseEvent, SFC, Component, ComponentType } from 'react'
import { render } from 'react-dom'

import { withDefaultProps } from './utils'

///// Stateless Component

const defaultProps = {
  color: 'red',
}

type DefaultProps = typeof defaultProps
type Props = { onClick(e: MouseEvent<HTMLElement>): void } & DefaultProps

const Button: SFC<Props> = ({ onClick: handleClick, color, children }) => (
  <button style={{ color }} onClick={handleClick}>
    {children}
  </button>
)

const ButtonWithDefaultProps = withDefaultProps(defaultProps, Button)

const ButtonViaSfc = withDefaultProps<Props>(
  defaultProps,
  ({ onClick: handleClick, color, children }) => (
    <button style={{ color }} onClick={handleClick}>
      {children}
    </button>
  )
)

const ButtonViaClass = withDefaultProps(
  defaultProps,
  class Button extends Component<Props> {
    render() {
      const { onClick: handleClick, children, color } = this.props
      return (
        <button style={{ color }} onClick={handleClick}>
          {children}
        </button>
      )
    }
  }
)

///// Statefull Component

const initialState = { clicksCount: 0 }
type State = Readonly<typeof initialState>

class ButtonCounter extends Component<object, State> {
  readonly state: State = initialState

  // doBadThings = () => {
  //   this.state = { clicksCount: 12 }
  //   this.state.clicksCount = 1232
  // }

  render() {
    const { clicksCount } = this.state
    return (
      <>
        <ButtonWithDefaultProps onClick={this.handleIncrement}>Increment</ButtonWithDefaultProps>
        <ButtonWithDefaultProps onClick={this.handleDecrement}>Decrement</ButtonWithDefaultProps>
        You've clicked me {clicksCount} times!
      </>
    )
  }

  // WHY readonly state ?
  // --------------------
  // doBadThings = () => { this.state = { clicksCount: 12 } }
  //
  // Will throw following complile error:
  //
  // [ts]
  // Cannot assign to 'state' because it is a constant or a read-only property.

  private handleIncrement = () => this.setState(incrementClicksCount)
  private handleDecrement = () => this.setState(decrementClicksCount)
}

const incrementClicksCount = (prevState: State) => ({ clicksCount: prevState.clicksCount + 1 })
const decrementClicksCount = (prevState: State) => ({ clicksCount: prevState.clicksCount - 1 })

// WHY
// - type State = Readonly<typeof initialState>
// - readonly state: State = {...}
// ?
// --------------------
// const decrementClicksCountExample = (prevState: State) => ({ clicksCount: prevState.clicksCount-- })
//
// Will throw following complile error:
//
// [ts]
// Cannot assign to 'clicksCount' because it is a constant or a read-only property.

/////

const App = () => {
  return (
    <>
      <ButtonCounter />
    </>
  )
}
const MOUNT_POINT = document.getElementById('app')

render(<App />, MOUNT_POINT)
