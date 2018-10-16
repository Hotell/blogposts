export const Todo = (description: string) => ({
  id: String(Date.now()),
  done: false,
  description,
})

// ================

import { Component } from 'react'

interface TodoModel extends ReturnType<typeof Todo> {}

type State = typeof initialState
const initialState = Object.freeze({ todos: null as null | TodoModel[] })

class App extends Component<{}, State> {
  readonly state = initialState
  handleTodoCreation = (description: string) => {
    const newTodo = Todo(description)
    // update state etc
  }
}
