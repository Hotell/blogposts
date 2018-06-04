import { SFC, MouseEvent, Component, ReactElement, ReactNode } from 'react'
import React from 'react'
import { createPropsGetter } from './utils'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
  children: ReactNode
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  color: 'blue' as 'blue' | 'green' | 'red',
  type: 'button' as 'button' | 'submit',
}
const getProps = createPropsGetter(defaultProps)

class Button extends Component<Props> {
  static defaultProps = defaultProps
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

const ButtonSFC: SFC<Props> = (props) => {
  const { onClick: handleClick, color, type, children } = getProps(props)

  const cssClass = resolveColorTheme(color)

  return (
    <button type={type} className={cssClass} onClick={handleClick}>
      {children}
    </button>
  )
}
ButtonSFC.defaultProps = defaultProps

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
        <ButtonSFC onClick={this.handleClick}>Click me!</ButtonSFC>
      </div>
    )
  }
}
