import { SFC, MouseEvent, Component, ReactElement, ReactNode } from 'react'
import React from 'react'
import { createPropsGetter } from './utils'

type Props<T> = {
  onClick(e: MouseEvent<HTMLElement>): T
  children: ReactNode
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}
const getProps = createPropsGetter(defaultProps)

class Button<T> extends Component<Props<T>> {
  render() {
    const { onClick: handleClick, color, type, children } = getProps(this.props)

    const cssClass = resolveColorTheme(color)

    return (
      <button type={type} className={cssClass} onClick={handleClick}>
        {children}
      </button>
    )
  }
}

const ButtonSFC = <T extends {}>(props:Props<T>) => {
  const { onClick: handleClick, color, type, children } = getProps(props)

    const cssClass = resolveColorTheme(color)

    return (
      <button type={type} className={cssClass} onClick={handleClick}>
        {children}
      </button>
    )
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
    return 7
  }
  render() {
    return (
      <div>
        <Button <number> onClick={this.handleClick}>Click me!</Button>
        <ButtonSFC <number> onClick={this.handleClick}>Click me!</ButtonSFC>
      </div>
    )
  }
}
