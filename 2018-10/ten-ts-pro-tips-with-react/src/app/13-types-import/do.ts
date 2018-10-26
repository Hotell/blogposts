export const handleChange = (
  ev: import('react').ChangeEvent<HTMLInputElement>
) => {
  // implementation
}
export const increment = (state: import('./counter').Counter['state']) => ({
  count: state.count + 1,
})
export const decrement = (state: import('./counter').Counter['state']) => ({
  count: state.count + 1,
})
