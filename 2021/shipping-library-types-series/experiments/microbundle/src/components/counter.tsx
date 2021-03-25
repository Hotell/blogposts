import React, { useState } from 'react'
import { Pointer } from '../types'

export const Hello: React.VFC<Pointer> = (props) => {
  return <div>hello {JSON.stringify(props)}</div>
}

export const Hello2 = (): React.ReactElement => {
  return <div>hello</div>
}

export function Counter(props: { initialCount?: number }): React.ReactElement {
  const [state, setState] = useState(props.initialCount || 0)

  return (
    <div>
      <code>
        Count: <b>{state}</b>
      </code>
      <button
        onPointerDown={() => {
          setState((prev) => prev + 1)
        }}
      >
        inc
      </button>
      <button
        onPointerDown={() => {
          setState((prev) => prev + 1)
        }}
      >
        dec
      </button>
    </div>
  )
}
