import { SFC, MouseEvent, Component } from 'react'
import React from 'react'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
} & Partial<DefaultProps>
type DefaultProps = {
  color: 'blue' | 'green' | 'red'
  type: 'button' | 'submit'
}

class Button extends Component<Props> {
  static defaultProps: DefaultProps = {
    color: 'blue',
    type: 'button',
  }
  render() {
    const { onClick: handleClick, color, type, children } = this.props

    return (
      <button type={type} style={{ color }} onClick={handleClick}>
        {children}
      </button>
    )
  }
}

class App extends Component {
  private handleClick = () => {
    console.log('clicked!')
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Click me!</Button>
      </div>
    )
  }
}
