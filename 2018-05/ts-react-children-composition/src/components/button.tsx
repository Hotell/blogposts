import React, { Component, ReactNode, SyntheticEvent } from 'react'

import './button.css'
type Props = {
  children: ReactNode
  onClick?: (ev: SyntheticEvent) => void
}
export class Button extends Component<Props> {
  render() {
    const { children, onClick } = this.props
    return (
      <button className="btn" onClick={onClick}>
        {children}
      </button>
    )
  }
}
