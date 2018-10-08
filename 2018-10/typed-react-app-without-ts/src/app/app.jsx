// @ts-check
import 'papercss/dist/paper.min.css'

import React, { Component } from 'react'
import { CreateTodo } from './create-todo'
import { TodoItem } from './todo-item'
import { DebugMode } from './debug'
import { Todo } from './models'

/**
 * @typedef {typeof initialState} State
 */

const initialState = {
  todos: /** @type {null | Todo[]} */ (null),
}

/**
 * @extends {Component<{},State>}
 */
export class App extends Component {
  /**
   * @property {State}
   */
  state = initialState

  get todosLeftCount() {
    const { todos } = this.state
    return todos ? todos.filter((todo) => !todo.done).length : 0
  }

  /**
   * @param {string} description
   */
  handleCreate = (description) => {
    const newTodo = Todo(description)

    const todos = this.state.todos || []

    const newTodos = [...todos, newTodo]
    this.setState(() => ({
      todos: newTodos,
    }))
  }

  /**
   * @param {string} id
   */
  handleTodoCompleteChange = (id) => {
    if (!this.state.todos) {
      return
    }

    const newTodos = this.state.todos.map((todo) => {
      return todo.id !== id ? todo : { ...todo, done: !todo.done }
    })

    this.setState(() => ({
      todos: newTodos,
    }))
  }

  /**
   * @param {string} id
   */
  handleTodoRemoval = (id) => {
    if (!this.state.todos) {
      return
    }

    const newTodos = this.state.todos.filter((todo) => todo.id !== id)

    this.setState(() => ({
      todos: newTodos,
    }))
  }

  render() {
    const { todos } = this.state

    return (
      <main className="container">
        <h1 className="text-center">Todo App</h1>
        <DebugMode>{this.state}</DebugMode>
        <CreateTodo onCreate={this.handleCreate} />
        {todos && todos.length
          ? todos.map((todo) => (
              <TodoItem
                key={todo.id}
                model={todo}
                onCompleteChange={this.handleTodoCompleteChange}
                onRemove={this.handleTodoRemoval}
              />
            ))
          : null}
        <p className="border border-muted padding-large text-center">
          Remaining todos: <b>{this.todosLeftCount}</b> 👀 ✍️
        </p>
      </main>
    )
  }
}
