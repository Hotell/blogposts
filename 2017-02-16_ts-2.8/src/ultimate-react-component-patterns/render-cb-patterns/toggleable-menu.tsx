import React, { SFC, Component, Fragment } from 'react'

import { Toggleable, withToogleable, InjectedProps } from './toggleable'

type MenuItemProps = { title: string }
const MenuItem: SFC<MenuItemProps & InjectedProps> = ({ title, toggle, show, children }) => (
  <Fragment>
    <div onClick={toggle}>
      <h1>{title}</h1>
    </div>
    {show ? children : null}
  </Fragment>
)
type ToggleableMenuItemProps = MenuItemProps & { show?: boolean }
const ToggleableMenu: SFC<ToggleableMenuItemProps> = ({ title, children, show: showContent }) => (
  <Toggleable show={showContent}>
    {({ show, toggle }) => (
      <Fragment>
        <MenuItem title={title} toggle={toggle} show={show}>
          {children}
        </MenuItem>
      </Fragment>
    )}
  </Toggleable>
)

const ToggleableWithTitle = Toggleable.ofType<MenuItemProps>()

const ToggleableMenuViaComponentInjection: SFC<ToggleableMenuItemProps> = ({ title, children, show: showContent }) => (
  <Fragment>
    <ToggleableWithTitle component={MenuItem} props={{ title }} show={showContent}>
      {children}
    </ToggleableWithTitle>
  </Fragment>
)

const ToggleableMenuViaHOC = withToogleable(MenuItem)

type MenuState = { showContents: boolean }
export class Menu extends Component<never, MenuState> {
  state = { showContents: false }
  render() {
    const { showContents } = this.state

    return (
      <Fragment>
        <button onClick={this.toggleShowContents}>toggle showContent</button>
        <hr />
        <ToggleableMenu title="First Menu" show={showContents}>
          Some content
        </ToggleableMenu>
        <ToggleableMenuViaComponentInjection title="Second Menu" show={showContents}>
          Another content
        </ToggleableMenuViaComponentInjection>
        <ToggleableMenuViaHOC title="Third Menu" show={showContents}>
          More content
        </ToggleableMenuViaHOC>
      </Fragment>
    )
  }

  private toggleShowContents = () => this.setState(prevState => ({ showContents: !prevState.showContents }))
}
