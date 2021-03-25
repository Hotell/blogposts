import React from 'react'

const defaultProps = {
  who: 'World',
  greeting: 'Hello',
}
type Props = Partial<typeof defaultProps>
export function Greeter(props: Props) {
  const { who, greeting } = { ...defaultProps, ...props }
  return (
    <div>
      {greeting} {who} !
    </div>
  )
}

// should be tree shaken
const App = () => {
  return (
    <div>
      <Greeter />
    </div>
  )
}