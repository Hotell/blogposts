import React, { Component, SyntheticEvent, MouseEvent } from 'react'

import { withToggle, WithToggleInjectedProps } from './with-toggle'

type Props = {
  title: string
} & WithToggleInjectedProps
class MenuItem extends Component<Props> {
  render() {
    const { title, onClick: handleClick } = this.props

    return (
      <div onClick={handleClick}>
        <h1>{title}</h1>
      </div>
    )
  }
}

export const ToggleableMenu = withToggle(MenuItem)
