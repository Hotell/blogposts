import React, { Component, Fragment } from 'react'

import {
  ToggleableMenu,
  ToggleableMenuViaComponentInjection,
  ToggleableMenuViaHOC,
} from './toggleable-menu'

const initialState = { showContents: false }
type State = Readonly<typeof initialState>
export class Menu extends Component<{}, State> {
  state: State = initialState
  render() {
    const { showContents } = this.state

    return (
      <Fragment>
        <button onClick={this.toggleShowContents}>Toggle show content</button>
        <hr />
        <ToggleableMenu title="First Menu" show={showContents}>
          <p>Some content</p>
        </ToggleableMenu>
        <ToggleableMenuViaComponentInjection title="Second Menu" show={showContents}>
          <p>Another content</p>
        </ToggleableMenuViaComponentInjection>
        <ToggleableMenuViaHOC title="Third Menu" show={showContents}>
          <p>More content</p>
        </ToggleableMenuViaHOC>
      </Fragment>
    )
  }

  private toggleShowContents = () =>
    this.setState((prevState) => ({ showContents: !prevState.showContents }))
}
