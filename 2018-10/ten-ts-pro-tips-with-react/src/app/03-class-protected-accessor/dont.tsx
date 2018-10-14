import React, { Component } from 'react'

type BaseProps = { config: object; who: string }

class Base extends Component<BaseProps> {
  protected renderInnerContent(config: BaseProps['config']) {
    return (
      <>
        <p>Lorem Ipsum</p>
        <pre>{JSON.stringify(config)}</pre>
      </>
    )
  }
}

class SomeFeature extends Base {
  render() {
    return <div>{this.renderInnerContent(this.props)}</div>
  }
}
