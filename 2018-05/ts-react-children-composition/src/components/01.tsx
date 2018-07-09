import React, { Component, ReactNode } from 'react'
import './card.css'
{
  class Card extends Component {
    render() {
      return <div className="card">{this.props.children}</div>
    }
  }
}

type Props = {
  children: ReactNode
}
export class Card extends Component<Props> {
  render() {
    return <div className="card">{this.props.children}</div>
  }
}
