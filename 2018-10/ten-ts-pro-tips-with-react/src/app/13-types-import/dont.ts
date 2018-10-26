import { ChangeEvent } from 'react'
import { Counter } from './counter'

export const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
  // implementation
}
export const increment = (state: Counter['state']) => ({
  count: state.count + 1,
})
export const decrement = (state: Counter['state']) => ({
  count: state.count + 1,
})
