import React from 'react'

export interface StatefulCounterWithDefaultProps {
  label: string
  initialCount?: number
}

interface DefaultProps {
  readonly initialCount: number
}

interface State {
  readonly count: number
}

export const StatefulCounterWithDefault: React.ComponentClass<
  StatefulCounterWithDefaultProps
> = class extends React.Component<StatefulCounterWithDefaultProps & DefaultProps> {
  // to make defaultProps strictly typed we need to explicitly declare their type
  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
  static defaultProps: DefaultProps = {
    initialCount: 0,
  }

  readonly state: State = {
    count: this.props.initialCount,
  }

  componentWillReceiveProps({ initialCount }: StatefulCounterWithDefaultProps) {
    if (initialCount != null && initialCount !== this.props.initialCount) {
      this.setState({ count: initialCount })
    }
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    const { handleIncrement } = this
    const { label } = this.props
    const { count } = this.state

    return (
      <div>
        <span>
          {label}: {count}{' '}
        </span>
        <button type="button" onClick={handleIncrement}>
          {`Increment`}
        </button>
      </div>
    )
  }
}
