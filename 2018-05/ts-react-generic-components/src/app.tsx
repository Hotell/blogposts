import React, { Component } from 'react'

import { Select, SelectSFC } from './components/select'
import { AppDemo } from './components/select-blogpost-demo'

import './style.css'

interface User {
  uname: string
  age: number
}
const isUser = (value: any): value is User =>
  typeof value === 'object' && (value.uname || value.age)

type State = typeof initialState
const initialState = {
  selected: {},
  collections: {
    iceCream: ['Chocolate', 'Coconut', 'Mint', 'Strawberry', 'Vanilla'],
    browsers: ['Chrome', 'Firefox', 'Internet Explorer', 'Opera', 'Safari', 'Microsoft Edge'],
    library: ['React', 'Preact', 'Vue', 'jQuery'],
    users: [
      { uname: 'Martin', age: 31 },
      { uname: 'Peter', age: 32 },
      { uname: 'Anna', age: 26 },
    ] as User[],
    players: [
      { uname: 'Sean', age: 22 },
      { uname: 'Carl', age: 12 },
      { uname: 'Maria', age: 24 },
    ] as User[],
  },
}
export class App extends Component<{}, State> {
  static SelectedItems = (props: { selected: { [key: string]: any } }) => {
    const keys = Object.keys(props.selected)
    const renderItem = (key: string) => {
      const value = props.selected[key]
      const renderElem = isUser(value) ? value.uname : value
      return <li key={key}>{renderElem}</li>
    }

    return <ul>{keys.map(renderItem)}</ul>
  }
  static Debug = (props: { value: {} }) => <pre>{JSON.stringify(props.value, null, 2)}</pre>
  state = initialState
  private handleSelect = (itemValue: string | User, ev: React.SyntheticEvent<HTMLInputElement>) => {
    const { name: fieldName } = ev.currentTarget
    this.setState((prevState) => ({
      ...prevState,
      selected: { ...prevState.selected, [fieldName]: itemValue },
    }))
  }
  render() {
    return (
      <main>
        <h1>Generic Components</h1>
        <section className="container">
          <AppDemo />
        </section>
        {/* <hr />
        <section className="container">
          <div>
            Selected items:
            <App.SelectedItems selected={this.state.selected} />
            <App.Debug value={this.state.selected} />
          </div>
          <div>
            <Select
              name="ice-cream-choice"
              label="Choose a flavor"
              items={this.state.collections.iceCream}
              onSelect={this.handleSelect}
            />
            <Select<string>
              name="my-browser"
              label="Choose a browser from this list"
              items={this.state.collections.browsers}
              onSelect={this.handleSelect}
            />
            <Select<User>
              name="my-user"
              label="Choose user from this list"
              items={this.state.collections.users}
              onSelect={this.handleSelect}
            />
            <SelectSFC<string>
              name="my-library"
              label="Choose your favourite library"
              items={this.state.collections.library}
              onSelect={this.handleSelect}
            />
            <SelectSFC<User>
              name="my-character"
              label="Choose a character"
              items={this.state.collections.players}
              onSelect={this.handleSelect}
            />
          </div>
        </section> */}
      </main>
    )
  }
}
