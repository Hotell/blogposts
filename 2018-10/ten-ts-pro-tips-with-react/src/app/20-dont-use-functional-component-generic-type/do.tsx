import React from 'react'

function example() {
  type Props = {
    who: string
    greeting: string
  }

  const Greeter = (props: Props) => (
    <div>
      {props.greeting} {props.who}!
    </div>
  )

  const Test = () => (
    <>
      <Greeter greeting="Hello" who="Martin" />
    </>
  )
}
function defaultPropsExample() {
  type Props = {
    who: string
  } & typeof defaultProps

  const defaultProps = {
    greeting: 'Hello',
  }

  const Greeter = (props: Props) => (
    <div>
      {props.greeting} {props.who}!
    </div>
  )
  Greeter.defaultProps = defaultProps

  const Test = () => (
    <>
      <Greeter who="Martin" />
    </>
  )
}

function genericPropsExample() {
  type Props<T extends object> = {
    data: T
    when: Date
  }

  const GenericComponent = <T extends object>(props: Props<T>) => {
    return (
      <div>
        At {props.when} : {JSON.stringify(props.data)}
      </div>
    )
  }

  const Test = () => {
    interface DataSchema {
      a: number
      b: string
    }

    return (
      <>
        <GenericComponent<DataSchema>
          data={{ a: 10, b: 'hi' }}
          when={new Date()}
        />
      </>
    )
  }
}
