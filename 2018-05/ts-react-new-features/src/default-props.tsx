import React, { Component, SFC } from 'react'
import { render } from 'react-dom'

import { withDefaultProps } from './utils'

{
  class Hello extends Component<{
    /**
     * @default 'TypeScript'
     */
    compiler?: string
    framework: string
  }> {
    static defaultProps = {
      compiler: 'TypeScript',
    }
    render() {
      const compiler = this.props.compiler!
      return (
        <div>
          <div>{compiler}</div>
          <div>{this.props.framework}</div>
        </div>
      )
    }
  }

  render(
    <Hello framework="React" />, // TypeScript React
    document.getElementById('root')
  )
}
// ==== //
{
  const Hello: SFC<{
    /**
     * @default 'TypeScript'
     */
    compiler?: string
    framework: string
  }> = ({
    compiler = 'TypeScript', // Default prop
    framework,
  }) => {
    return (
      <div>
        <div>{compiler}</div>
        <div>{framework}</div>
      </div>
    )
  }

  render(
    <Hello framework="React" />, // TypeScript React
    document.getElementById('root')
  )
}

// =========== //
// =========== //

// =========== //
// @TODO resolve how to use this pattern with generic components
type Props<T> = {
  compiler: string
  framework: string
}
const defaultProps = { compiler: 'Typescript' }
{
  const Hello = withDefaultProps(
    defaultProps,
    class Hello<T> extends Component<Props<T>> {
      render() {
        const compiler = this.props.compiler!
        return (
          <div>
            <div>{compiler}</div>
            <div>{this.props.framework}</div>
          </div>
        )
      }
    }
  )

  render(
    <Hello framework="React" />, // TypeScript React
    document.getElementById('root')
  )
}

// =========== //
{
  type Props = {
    compiler: string
    framework: string
  }
  const defaultProps = { compiler: 'Typescript' }
  const Hello = withDefaultProps(defaultProps, ({ compiler, framework }: Props) => {
    return (
      <div>
        <div>{compiler}</div>
        <div>{framework}</div>
      </div>
    )
  })

  render(
    <Hello framework="React" />, // TypeScript React
    document.getElementById('root')
  )
}
