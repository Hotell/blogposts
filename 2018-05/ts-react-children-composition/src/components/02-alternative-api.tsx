import React, { ReactNode, Component } from 'react'

type Props = {
  children: ReactNode
  header?: ReactNode
  media?: ReactNode
  actions?: ReactNode
}
export class Card extends Component<Props> {
  render() {
    const { children: content, header, media, actions } = this.props

    return (
      <div className="card">
        {header ? <div className="card-header">{header}</div> : null}
        {media ? <div className="card-media">{media}</div> : null}
        <div className="card-content">{content}</div>
        {actions ? <div className="card-actions">{actions}</div> : null}
      </div>
    )
  }
}
