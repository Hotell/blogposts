import React, { createElement, Children } from 'react'
import { Provider } from './provider'
import { Counter } from './counter'

const EnhancedCounter = Provider.withEnhancedProps(Counter)
// const EnhancedCounter = createElement(Provider.withEnhancedProps(Counter), {})
export const App = () => (
  <>
    <h1>Hello ngParty</h1>
    <Provider>
      <EnhancedCounter title="cloneElement children" />
    </Provider>
    {/* <Provider>{createElement(Provider.withEnhancedProps(Counter), {})}</Provider> */}
    <Provider>
      {({ count, onDecrement, onIncrement }) => (
        <Counter
          count={count}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          title="children as a function"
        />
      )}
    </Provider>
    <Provider>{(props) => <Counter {...props} title="children as a function" />}</Provider>
  </>
)
