/** @jsx createElement */
import { createElement } from 'react'

type Props = {
  // 🚨 global type for JSX
  children: JSX.Element
}
const MyComponent = (props: Props) => {
  /* ... */
}

// ======================================================

type Data = { id: string; email: string; age: number }

// 🚨 global return type for JSX
const renderListHelper = (data: Data[]): JSX.Element => {
  /* some logic and stuff */
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{/*...*/}</div>
      ))}
    </div>
  )
}
