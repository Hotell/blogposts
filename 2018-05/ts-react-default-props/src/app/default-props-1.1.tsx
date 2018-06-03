import { SFC, MouseEvent, Component } from 'react'
import React from 'react'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}

class Button extends Component<Props> {
  static defaultProps = defaultProps
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
