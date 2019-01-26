import React, { Component, ChangeEvent } from 'react'

type Props = {
  defaultEmail: string
}
type State = ReturnType<typeof getInitialState>

const getInitialState = (props: Props) => {
  return {
    email: props.defaultEmail,
  }
}

class EmailInput extends Component<Props, State> {
  readonly state = getInitialState(this.props)

  _handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: ev.target.value })
  }

  render() {
    return <input onChange={this._handleChange} value={this.state.email} />
  }
}
