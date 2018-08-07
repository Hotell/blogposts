import React, { ReactNode, forwardRef } from 'react'

type Props = { children: ReactNode; type: 'submit' | 'button' }

{
  const FancyButton = (props: Props) => (
    <button className="FancyButton" type={props.type}>
      {props.children}
    </button>
  )
}

// fancy-button.tsx
export type Ref = HTMLButtonElement
export const FancyButton = forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="FancyButton" type={props.type}>
    {props.children}
  </button>
))

///

const App = () => {
  // You can now get a ref directly to the DOM button:
  const ref = React.createRef<Ref>()
  return (
    <>
      <FancyButton type="button" ref={ref}>
        Click me!
      </FancyButton>
    </>
  )
}
