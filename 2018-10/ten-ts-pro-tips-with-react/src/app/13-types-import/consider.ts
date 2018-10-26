type State = import('./counter').Counter['state']
type ChangeEvent<T = Element> = import('react').ChangeEvent<T>

export const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
  // implementation
}
export const increment = (state: State) => ({
  count: state.count + 1,
})
export const decrement = (state: State) => ({
  count: state.count + 1,
})
