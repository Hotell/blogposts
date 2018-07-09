import React, { ReactNode, Component, ComponentType } from 'react'

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type XOR<T, U> = (T | U) extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

type User = {
  email: string
  age: number
}
interface BaseProps {
  endpoint: string
}

type ChildrenProps =
  | {
      render: (props: User) => ReactNode
    }
  | { children: (props: User) => ReactNode }

type ChildrenPropsXor = XOR<
  XOR<
    {
      render: (props: User) => ReactNode
    },
    { children: (props: User) => ReactNode }
  >,
  { component: ComponentType }
>

type Foo = keyof ChildrenProps

// interface Props extends BaseProps, ChildrenProps {}
type Props = BaseProps & ChildrenPropsXor

class AsCmp extends Component {}

class Provider extends Component<Props> {
  render() {
    return null
  }
}

const App = () => (
  <>
    <Provider
      endpoint="api/users"
      render={({ age }) => {
        return <p>{age}</p>
      }}
    />
    <Provider endpoint="api/users">
      {({ age }) => {
        return <p>{age}</p>
      }}
    </Provider>
    <Provider endpoint="api/users" component={AsCmp} />
    <Provider
      endpoint="api/users"
      component={AsCmp}
      render={({ age }) => {
        return <p>{age}</p>
      }}
    />
    <Provider
      endpoint="api/users"
      render={({ age }) => {
        return <p>{age}</p>
      }}
    >
      {({ age }) => {
        return <p>{age}</p>
      }}
    </Provider>
  </>
)
