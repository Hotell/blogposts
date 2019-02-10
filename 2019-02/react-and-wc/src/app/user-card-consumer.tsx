import React, { ReactChild, Component, createRef, ClassAttributes } from 'react'

import '../lib/web-components/user-card'

import { DataForm } from './data-form'

type UserCard = import('../lib/web-components').UserCard
type UserModel = UserCard['user']

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // 1. what we expect, but wont work
      // 'x-user-card': Pick<UserCard, 'user'>

      // 2. we need only react attributes support
      'x-user-card': Partial<Pick<UserCard, 'user'>> & ClassAttributes<UserCard>
    }
  }
}

const initialState = {
  user: {
    uname: 'John Doe',
    email: 'john@doe.com',
    age: 77,
  } as UserCard['user'],
}

export class WebComponentUserCardConsumer extends Component<
  {},
  typeof initialState
> {
  readonly state = initialState
  userCardRef = createRef<UserCard>()

  handleUserChange = (user: UserCard['user']) => {
    this.setState((prevState) => ({ user: { ...prevState.user, ...user } }))
  }
  render() {
    const { user } = this.state

    return (
      <section className="row flex-spaces">
        {/*  1. Wont work */}
        <x-user-card user={user} />

        {/*  2. works */}
        <x-user-card ref={this.userCardRef} />

        <DataForm
          initialData={this.state.user}
          onChange={this.handleUserChange}
        />

        {/* <DataForm initialData={{ who: 'React', greeting: 'Hello' }}>
          {(data) => <x-greeter greeting={data.greeting} who={data.who} />}
        </DataForm> */}
      </section>
    )
  }
  componentDidMount() {
    if (this.userCardRef.current) {
      this.userCardRef.current.user = this.state.user
    }
  }
  componentDidUpdate(prevProps: {}, prevState: typeof initialState) {
    const currState = this.state

    if (currState.user === prevState.user) {
      return
    }

    if (this.userCardRef.current) {
      this.userCardRef.current.user = this.state.user
    }
  }
}
