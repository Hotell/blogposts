/** @jsx createElement */
import { createElement, ReactChild, ReactElement } from 'react'

type Props = {
  children: ReactChild
}
const MyComponent = (props: Props) => {
  /* ... */
}

// ======================================================

type Data = { id: string; email: string; age: number }

const renderListHelper = (data: Data[]): ReactElement<any> => {
  /* some logic and stuff */
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{/*...*/}</div>
      ))}
    </div>
  )
}
