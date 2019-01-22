import React, { FC } from 'react'

function example() {
  type Props = {
    who: string
    greeting: string
  }

  const Greeter: FC<Props> = (props) => (
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

  const Greeter: FC<Props> = (props) => (
    <div>
      {props.greeting} {props.who}!
    </div>
  )
  // 🚨 This won't work
  Greeter.defaultProps = defaultProps

  const Test = () => (
    <>
      {/** ExpectError Property 'greeting' is missing */}
      <Greeter who="Martin" />
    </>
  )
}

function genericPropsExample() {
  type Props<T extends object> = {
    data: T
    when: Date
  }

  // $ExpectError
  const GenericComponent: FC<Props<T extends object>> = (props) => {
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
      /* $ExpectError */
        <GenericComponent<DataSchema>
          data={{ a: 10, b: 'hi' }}
          when={new Date()}
        />
      </>
    )
  }
}
