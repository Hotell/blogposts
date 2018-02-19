import React, { SFC, Component, Fragment } from 'react'

import { Toggleable, ToggleableComponentProps } from './toggleable'
import { withToogleable } from './with-toggleable'

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
  // type Props = { title: string }
  // const ToggleableMenu: SFC<Props> = ({ title, children }) => (
  //   <Toggleable
  //     render={({ show, toggle }) => (
  //       <>
  //         <div onClick={toggle}>
  //           <h1>{title}</h1>
  //         </div>
  //         {show ? children : null}
  //       </>
  //     )}
  //   />
  // )
  // class Menu extends Component {
  //   render() {
  //     return (
  //       <>
  //         <ToggleableMenu title="First Menu">Some content</ToggleableMenu>
  //         <ToggleableMenu title="Second Menu">Another content</ToggleableMenu>
  //         <ToggleableMenu title="Third Menu">More content</ToggleableMenu>
  //       </>
  //     )
  //   }
  // }
}

// Stateless MenuItem
type MenuItemProps = { title: string }
const MenuItem: SFC<MenuItemProps & ToggleableComponentProps> = ({
  title,
  toggle,
  show,
  children,
}) => (
  <Fragment>
    <div onClick={toggle}>
      <h1>{title}</h1>
    </div>
    {show ? children : null}
  </Fragment>
)

// Wrapped Stateless MenuItem with  Toggleable via children as a function ( render prop pattern )
type ToggleableMenuProps = MenuItemProps & { show?: boolean }
const ToggleableMenu: SFC<ToggleableMenuProps> = ({ title, children, show: showContent }) => (
  <Toggleable show={showContent}>
    {({ show, toggle }) => (
      <MenuItem title={title} toggle={toggle} show={show}>
        {children}
      </MenuItem>
    )}
  </Toggleable>
)

// Wrapped Stateless MenuItem with Toggleable via Component injection + Generic compoennt pattern
const ToggleableWithTitle = Toggleable.ofType<MenuItemProps>()
const ToggleableMenuViaComponentInjection: SFC<ToggleableMenuProps> = ({
  title,
  children,
  show: showContent,
}) => (
  <ToggleableWithTitle component={MenuItem} props={{ title }} show={showContent}>
    {children}
  </ToggleableWithTitle>
)

// Wrapped Stateless MenuItem with withToggleable HOC pattern
const ToggleableMenuViaHOC = withToogleable(MenuItem)

export { ToggleableMenu, ToggleableMenuViaComponentInjection, ToggleableMenuViaHOC }
