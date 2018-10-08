// @ts-check
import React, { Component, ChangeEvent, FormEvent } from 'react'

/**
 * @typedef {{onCreate: (description:string)=>void}} Props
 */

/**
 * @typedef {typeof initialState} State
 */

const initialState = Object.freeze({
  description: '',
})

/**
 * @extends {Component<Props,State>}
 */
export class CreateTodo extends Component {
  state = initialState

  /**
   * @param {FormEvent} ev
   */
  handleSubmit = (ev) => {
    ev.preventDefault()
    const { description } = this.state

    this.props.onCreate(description)
    this.setState(() => initialState)
  }

  /**
   * @param {ChangeEvent<HTMLInputElement>} ev
   */
  handleChange = (ev) => {
    const { value } = ev.target

    this.setState(() => ({ description: value }))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="paper">
        <div className="form-group">
          <input
            type="text"
            className="input-block"
            placeholder="start typing..."
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
      </form>
    )
  }
}
