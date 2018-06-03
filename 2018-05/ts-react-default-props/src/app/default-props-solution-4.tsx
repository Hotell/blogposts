import { SFC, MouseEvent, Component, ReactElement, ReactNode } from 'react'
import React from 'react'
import { getProps, createPropsGetter } from './utils'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
  children: ReactNode
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}
const props = createPropsGetter(defaultProps)

class Button extends Component<Props> {
  render() {
    const { onClick: handleClick, color, type, children } = props(this.props)

    const cssClass = resolveColorTheme(color)

    return (
      <button type={type} className={cssClass} onClick={handleClick}>
        {children}
      </button>
    )
  }
}

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
