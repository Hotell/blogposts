import { createElement } from 'react'

const defaultProps = {
  who: 'World',
  greeting: 'Hello',
}
type Props = Partial<typeof defaultProps>
// type Props = Partial<{ who: string; greeting: string }>

// GOOD
// export function Greeter(props: Props): React.ReactElement {
// BAD -> tsc will add/inline global reference to react types
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
