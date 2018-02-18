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
      <MenuItem title={title} toggle={toggle} show={show}>
        {children}
      </MenuItem>
    )}
  </Toggleable>
)

{
  // RENDER PROPS chapter

  // ;<Toggleable
  //   render={({ show, toggle }) => (
  //     <>
  //       <div onClick={toggle}>
  //         <h1>Some title</h1>
  //       </div>
  //       {show ? <p>some content</p> : null}
  //     </>
  //   )}
  // />
  // ;<Toggleable>
  //   {({ show, toggle }) => (
  //     <>
  //       <div onClick={toggle}>
  //         <h1>Some title</h1>
  //       </div>
  //       {show ? <p>some content</p> : null}
  //     </>
  //   )}
  // </Toggleable>

  type Props = { title: string }
  const ToggleableMenu: SFC<Props> = ({ title, children }) => (
    <Toggleable
      render={({ show, toggle }) => (
        <>
          <div onClick={toggle}>
            <h1>{title}</h1>
          </div>
          {show ? children : null}
        </>
      )}
    />
  )

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
}

const ToggleableWithTitle = Toggleable.ofType<MenuItemProps>()

const ToggleableMenuViaComponentInjection: SFC<ToggleableMenuItemProps> = ({ title, children, show: showContent }) => (
  <ToggleableWithTitle component={MenuItem} props={{ title }} show={showContent}>
    {children}
  </ToggleableWithTitle>
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
