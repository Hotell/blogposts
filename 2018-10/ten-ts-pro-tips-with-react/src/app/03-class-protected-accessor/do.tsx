import React, { Component } from 'react'

class InnerContent extends Component<{ config: object }> {
  render() {
    return (
      <>
        <p>Lorem Ipsum</p>
        <pre>{JSON.stringify(this.props.config)}</pre>
      </>
    )
  }
}

type Props = { who: string } & InnerContent['props']
class SomeFeature extends Component<Props> {
  render() {
    return (
      <div>
        <InnerContent config={this.props.config} />
      </div>
    )
  }
}
