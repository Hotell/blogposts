import React, { Component } from 'react'
import { Select } from './select-blogpost'
import { Select as SelectRender } from './select-with-render-props'
import { Debug } from './debug'

type User = { name: string; age: number }

type Props = {}
type State = typeof initialState

const data = {
  heroes: ['Hulk', 'Iron Man'],
  users: [{ name: 'Peter', age: 32 }, { name: 'John', age: 23 }] as User[],
}

const initialState = {
  hero: '' as string | null,
  user: null as User | null,
}

export class AppDemo extends Component<Props, State> {
  static ListItem = (props: { value: any }) => <option value={props.value} />
  state = initialState
  render() {
    return (
      <>
        <Debug>{this.state}</Debug>
        <hr />
        <section>
          <h3>1. Generic Select</h3>
          <Select<string>
            key={String(this.state.hero)}
            name="hero"
            label="selec hero"
            active={this.state.hero}
            items={data.heroes}
            onSelect={(selected) => this.setState((prevState) => ({ hero: selected }))}
          />
          <Select<User>
            key={this.state.user ? this.state.user.name : undefined}
            name="user"
            label="selec user"
            displayKey="name"
            active={this.state.user}
            items={data.users}
            onSelect={(selected) => this.setState((prevState) => ({ user: selected }))}
          />
        </section>

        <hr />

        <section>
          <h3>2. Generic Select with Render Prop</h3>
          <SelectRender<string>
            key={String(this.state.hero)}
            name="hero"
            label="selec hero"
            active={this.state.hero}
            items={data.heroes}
            onSelect={(selected) => this.setState(() => ({ hero: selected }))}
          >
            {(item) => <option value={item} />}
          </SelectRender>
          <SelectRender<User>
            key={this.state.user ? this.state.user.name : undefined}
            name="user"
            label="selec user"
            displayKey="name"
            active={this.state.user}
            items={data.users}
            onSelect={(selected) => this.setState(() => ({ user: selected }))}
          >
            {(item) => <AppDemo.ListItem value={item.age} />}
          </SelectRender>
        </section>
      </>
    )
  }
}
