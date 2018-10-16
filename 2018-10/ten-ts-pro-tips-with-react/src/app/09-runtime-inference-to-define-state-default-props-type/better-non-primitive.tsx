import React, { Component } from 'react'

interface Todo {
  id: string
  done: boolean
  description: string
}

type State = typeof initialState
type Props = { someProps: string } & typeof defaultProps

const initialState = Object.freeze({ todos: null as null | Todo[] })
const defaultProps = Object.freeze({ who: 'Johnny 5' })

export class Counter extends Component<Props, State> {
  static readonly defaultProps = defaultProps
  readonly state = initialState

  render() {
    const { todos } = this.state

    return (
      <div>
        <ul>
          {todos
            ? todos.map((todo) => <li key={todo.id}>{JSON.stringify(todo)}</li>)
            : null}
        </ul>
      </div>
    )
  }
}
