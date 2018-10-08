// @ts-check
import 'papercss/dist/paper.min.css'

import React, { Component } from 'react'
import { CreateTodo } from './create-todo'
import { TodoItem } from './todo-item'
import { Debug } from './debug'

/**
 * @typedef {{id: string, description: string, done: boolean}} Todo
 */

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
   * @returns {void}
   */
  handleCreate = (description) => {
    /**
     * @type {Todo}
     */
    const newTodo = {
      id: String(Date.now()),
      done: false,
      description,
    }

    const todos = this.state.todos || []

    const newTodos = [...todos, newTodo]
    this.setState(() => ({
      todos: newTodos,
    }))
  }

  /**
   * @param {string} id
   * @returns {void}
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
   * @returns {void}
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
        <h1>Todo App</h1>
        <Debug value={this.state} />
        <CreateTodo onCreate={this.handleCreate} />
        {todos && todos.length ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              model={todo}
              onCompleteChange={this.handleTodoCompleteChange}
              onRemove={this.handleTodoRemoval}
            />
          ))
        ) : (
          <p className="text-center">No todos so far 👀 ✍️</p>
        )}
        <p className="text-center">Remaining todos: {this.todosLeftCount}</p>
      </main>
    )
  }
}
