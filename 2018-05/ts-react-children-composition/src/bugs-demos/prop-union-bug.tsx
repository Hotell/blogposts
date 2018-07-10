import React, { Component } from 'react'

type Props =
  | {
      type: 'foo'
      foo: 'blah' | 'wat'
    }
  | {
      type: 'bar'
      bar: string
    }
class Test extends Component<Props> {
  render() {
    return null
  }
}

const App = () => (
  <>
    {/* missing `foo` attribute intellisene, but works for literal values */}
    <Test type="foo" />;
    {/* missing `foo` attribute intellisene */}
    <Test type="bar" />
  </>
)
