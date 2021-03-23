import React, { useState } from 'react'

export function Counter(props: { initialCount?: number }) {
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
