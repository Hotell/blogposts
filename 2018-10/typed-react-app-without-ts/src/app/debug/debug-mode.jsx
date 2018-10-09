// @ts-check
import React, { Component } from 'react'
import { Debug } from './debug'

/**
 * @typedef {typeof initialState} State
 */

/**
 * @typedef {import('../types').ExtractFnArguments<typeof Debug>} Props
 */

const initialState = Object.freeze({
  on: false,
})

/**
 * @extends {Component<Props,State>}
 */
export class DebugMode extends Component {
  state = initialState

  toggleDebugMode = () => {
    this.setState((prevState) => ({ on: !prevState.on }))
  }

  render() {
    const { on } = this.state
    const { children } = this.props

    return (
      <section>
        <div className="form-group">
          <label htmlFor="debug-mode" className="paper-check">
            <input
              type="checkbox"
              id="debug-mode"
              checked={on}
              onChange={this.toggleDebugMode}
            />
            <span>Debug Mode</span>
          </label>
        </div>
        {on ? <Debug>{children}</Debug> : null}
      </section>
    )
  }
}
