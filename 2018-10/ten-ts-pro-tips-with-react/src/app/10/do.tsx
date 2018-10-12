export const Todo = (description: string) => ({
  id: String(Date.now()),
  done: false,
  description,
})

export interface Todo extends ReturnType<typeof Todo> {}

// ===========

import { Component } from 'react'

// $ExpectType {readonly todos: null | Todo[]}
type State = typeof initialState
const initialState = Object.freeze({ todos: null as null | Todo[] })

class App extends Component<{}, State> {
  readonly state = initialState
  handleTodoCreation = (description: string) => {
    // $ExpectType {id: string; done: boolean; description: string;}
    const newTodo = Todo(description)
    // update state etc
  }
}
