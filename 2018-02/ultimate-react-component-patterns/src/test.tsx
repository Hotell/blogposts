// import React, { Component } from 'react'

// // import React, { MouseEvent, SFC } from 'react'

// // type ButtonProps = { onClick(e: MouseEvent<HTMLElement>): void; color?: string }
// // const ButtonOptional: SFC<ButtonProps> = ({ onClick: handleClick, color, children }) => (
// //   <button style={{ color }} onClick={handleClick}>
// //   {color.}
// //     {children}
// //   </button>
// // )

// type Props = {
//   readfoo foo: number
// }
// const initialProps = {
//   foo: 111,
// }
// const initialState = {
//   baz: 1231,
// }
// type State = Readonly<typeof initialState>
// type StateManual = {
//   baz: number
// }
// export class Something extends Component<Props, State> {
//   static defaultProps = initialProps
//   readonly state: State = initialState
//   someMethod() {
//     // You can rest assured no one is going to do
//     this.props.foo = 123 // ERROR: (props are immutable)
//     this.props = {foo:123}
//     this.state.baz = 456 // ERROR: (one should use this.setState)
//     this.state = { baz: 456 }
//   }
// }
