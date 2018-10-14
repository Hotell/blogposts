import React, { Component } from 'react'

type ButtonProps = {
  children: import('react').ReactNode
}
class Button extends Component<ButtonProps> {
  render() {
    const { children } = this.props

    return <button>{children}</button>
  }
}

type Props = { id: string; name: string; email: string; children?: never }
class UserDetail extends Component<Props> {
  render() {
    const { id, email, name } = this.props
    return (
      <section>
        <h3>
          {name} : {id}
        </h3>
        <p>Email : {email}</p>
      </section>
    )
  }
}

const App = () => (
  <main>
    <Button>click</Button>
    {/* $Expect Error */}
    <Button />
    <UserDetail id="421312" email="johnny@five.org" name="Johnny the Fifth" />
    {/* $Expect Error */}
    <UserDetail id="421312" email="johnny@five.org" name="Johnny the Fifth">
      Who am I?
    </UserDetail>
  </main>
)
