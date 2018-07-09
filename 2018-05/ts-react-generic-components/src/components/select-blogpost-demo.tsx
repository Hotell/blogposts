import React, { Component } from 'react'
import { Select } from './select-blogpost'
import { Debug } from './debug'

type User = typeof data.users[0]

const data = {
  heroes: ['Hulk', 'Iron Man'],
  users: [{ name: 'Peter', age: 32 }, { name: 'John', age: 23 }],
}

const initialState = {
  hero: '' as string | null,
  user: null as User | null,
}

export class AppDemo extends Component<object, typeof initialState> {
  state = initialState
  render() {
    return (
      <>
        <Debug>{this.state}</Debug>
        <hr />
        <Select<string>
          name="hero"
          label="selec hero"
          active={this.state.hero}
          items={data.heroes}
          onSelect={(selected) => this.setState((prevState) => ({ hero: selected }))}
        />
        <Select<User>
          name="user"
          label="selec user"
          displayKey="name"
          active={this.state.user as User}
          items={data.users}
          onSelect={(selected) => this.setState((prevState) => ({ user: selected }))}
        />
      </>
    )
  }
}
