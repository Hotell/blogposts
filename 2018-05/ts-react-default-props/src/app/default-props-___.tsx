import { SFC, MouseEvent, Component } from 'react'
import React from 'react'

type Props = { onClick(e: MouseEvent<HTMLElement>): void } & DefaultProps
type DefaultProps = typeof defaultProps

const defaultProps = {
  color: 'red' as 'red' | 'blue',
  type: 'button' as 'button' | 'submit',
}

const ButtonSFC: SFC<Props> = (props) => {
  const { onClick: handleClick, color, type, children } = props

  return (
    <button type={type} style={{ color }} onClick={handleClick}>
      {children}
    </button>
  )
}
ButtonSFC.defaultProps = defaultProps

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
