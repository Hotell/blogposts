import React, { SFC } from 'react'
import './counter.css'

type Props = {
  count: number
  onIncrement(): void
  onDecrement(): void
  title?: string
}
export const Counter: SFC<Props> = ({ onDecrement, onIncrement, count, title }) => {
  return (
    <>
      {title ? <h3>{title}</h3> : null}
      <div className="counter">
        <button onClick={onIncrement}>+</button>
        <code>{count}</code>
        <button onClick={onDecrement}>-</button>
      </div>
    </>
  )
}
