import React, { ReactNode, Component, ReactChild } from 'react'

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

type Props = {
  children: ReactChild | NamedChildrenSlots
}

type NamedChildrenSlots = {
  header?: ReactChild
  media?: ReactChild
  content: ReactChild
  actions?: ReactChild
}

const isObject = <T extends object>(value: any): value is T =>
  typeof value === 'object' && typeof value !== 'function' && value != undefined
const isNamedSlots = (children: any): children is NamedChildrenSlots =>
  isObject(children) && 'content' in children

export class Card extends Component<Props> {
  render() {
    const { children } = this.props

    if (!children) {
      throw new Error('children is missing !')
    }

    if (isNamedSlots(children)) {
      const { header, content, media, actions } = children

      return (
        <div className="card">
          {header ? <div className="card-header">{header}</div> : null}
          {media ? <div className="card-media">{media}</div> : null}
          <div className="card-content">{content}</div>
          {actions ? <div className="card-actions">{actions}</div> : null}
        </div>
      )
    }

    return <div className="card">{children}</div>
  }
}
