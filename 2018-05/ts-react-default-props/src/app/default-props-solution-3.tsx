import { SFC, MouseEvent, Component, ComponentClass } from 'react'
import React from 'react'
import { withDefaultProps } from './utils'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
} & DefaultProps

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}

const Button = withDefaultProps(
  defaultProps,
  class extends Component<Props> {
    render() {
      const { onClick: handleClick, color, type, children } = this.props

      const cssClass = resolveColorTheme(color)

      return (
        <button type={type} className={cssClass} onClick={handleClick}>
          {children}
        </button>
      )
    }
  }
)

const resolveColorTheme = (color: DefaultProps['color']) => {
  const btnThemes = {
    blue: 'btn-primary',
    green: 'btn-secondary',
    red: 'btn-accent',
  }
  return btnThemes[color] || 'btn-default'
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
