import React, { MouseEvent, SFC, Component, ComponentType } from 'react'
import { render } from 'react-dom'

import { withDefaultProps } from './utils'

type Props = { onClick(e: MouseEvent<HTMLElement>): void }

const defaultProps: Props = {
  onClick: event => undefined,
}

const Button: SFC<Props> = ({ onClick: handleClick, children }) => <button onClick={handleClick}>{children}</button>

const ButtonViaSfc = withDefaultProps<Props>(
  ({ onClick: handleClick, children }) => <button onClick={handleClick}>{children}</button>,
  defaultProps
)

const ButtonViaClass = withDefaultProps<Props>(
  class Button extends Component<Props> {
    render() {
      const { onClick: handleClick, children } = this.props
      return <button onClick={handleClick}>{children}</button>
    }
  },
  defaultProps
)

const ButtonWithDefaults = withDefaultProps(Button, defaultProps)

const initialState = { clicksCount: 0 }
type State = Readonly<typeof initialState>
class ButtonCounter extends Component<object, State> {
  state: State = initialState
  render() {
    const { clicksCount } = this.state
    return (
      <>
        <ButtonWithDefaults />
        <Button onClick={this.handleIncrement}>Increment</Button>
        <Button onClick={this.handleDecrement}>Decrement</Button>
        You've clicked me {clicksCount} times!
      </>
    )
  }

  private handleIncrement = () => this.setState(incrementClicksCount)
  private handleDecrement = () => this.setState(decrementClicksCount)
}

const incrementClicksCount = (prevState: State) => ({ clicksCount: prevState.clicksCount + 1 })
const decrementClicksCount = (prevState: State) => ({ clicksCount: prevState.clicksCount - 1 })

// const decrementClicksCountExample = (prevState: State) => ({ clicksCount: prevState.clicksCount-- })
//
// Will throw following complile error:
//
// [ts]
// Cannot assign to 'clicksCount' because it is a constant or a read-only property.//

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
