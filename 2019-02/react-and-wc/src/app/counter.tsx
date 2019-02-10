import React, { useState } from 'react'

export function Counter({ defaultCount = 0 }: { defaultCount?: number }) {
  const [count, setCount] = useState(defaultCount)
  const inc = () => setCount(count + 1)
  const dec = () => setCount(count - 1)

  return (
    <div className="counter-root">
      <button onClick={inc} className="btn-success">
        Inc
      </button>
      <button onClick={dec} className="btn-danger">
        Dec
      </button>
      <p className="text-center">{count}</p>
    </div>
  )
}
