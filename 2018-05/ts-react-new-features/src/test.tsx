import React, { SFC, cloneElement, isValidElement, Children, ReactElement } from 'react'

type ProviderProps = {
  children: ReactElement<ViewProps>
}
const Provider: SFC<ProviderProps> = ({ children }) => {
  const extendedElement = cloneElement(children, {
    result: 1,
    onDecrement() {},
    onIncrement() {},
  })

  return <div>{extendedElement}</div>
}

type ViewProps = Partial<{
  result: number
  onDecrement(): void
  onIncrement(): void
}>
const View: SFC<ViewProps> = ({ result, onIncrement, onDecrement }) => (
  <>
    <div>Result: {result}</div>
    <button onClick={onIncrement}>inc</button>
    <button onClick={onDecrement}>dec</button>
  </>
)
const App: SFC = () => (
  <Provider>
    <View />
  </Provider>
)
