import React, { Component, SyntheticEvent, MouseEvent } from 'react'

import { withToggle, WithToggleInjectedProps } from './with-toggle'

type Props = {
  title: string
  // onClick(event: MouseEvent<HTMLElement>): void
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

const ToggleableMenu = withToggle(MenuItem)

class Menu extends Component {
  render() {
    return (
      <>
        <ToggleableMenu title="First Menu">Some content</ToggleableMenu>
        <ToggleableMenu title="Second Menu">Another content</ToggleableMenu>
        <ToggleableMenu title="Third Menu">More content</ToggleableMenu>
      </>
    )
  }
}
