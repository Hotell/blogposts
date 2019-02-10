import React, { ReactChild, Component } from 'react'

import '../lib/web-components/greeter'

import { Counter } from './counter'
import { DataForm } from './data-form'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // 'my-greeter': React.DetailedHTMLProps<
      //   React.HTMLAttributes<Greeter>,
      //   Greeter
      // >
      'x-greeter': Pick<
        import('../lib/web-components').Greeter,
        'who' | 'greeting'
      > & {
        children?: ReactChild
      }
    }
  }
}

export class WebComponentGreeterConsumer extends Component {
  render() {
    return (
      <section className="row flex-spaces">
        <x-greeter greeting="Hello" who="Martin" />
        <x-greeter greeting="Hello" who="children">
          🧒🏻🧒🧒🏼
        </x-greeter>

        <x-greeter greeting="Hello" who="Counter">
          <Counter />
        </x-greeter>

        <DataForm initialData={{ who: 'React', greeting: 'Hello' }}>
          {(data) => <x-greeter greeting={data.greeting} who={data.who} />}
        </DataForm>
      </section>
    )
  }
}
