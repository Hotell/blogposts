import { createStore, combineReducers, Reducer } from 'redux'

import * as fromRoot from './reducer'

type ReducersMapObject<S> = { [P in keyof S]: Reducer<S[P]> }

export interface State {
  root: fromRoot.State
}

const reducers: ReducersMapObject<State> = {
  root: fromRoot.reducer,
}

export const getStore = (initialState = {} as State) => {
  return createStore<State>(combineReducers(reducers), initialState)
}
