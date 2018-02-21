import * as fromActions from './actions'

export interface State {
  user: { age: number; name: string } | {}
  reloadPage: boolean
}
export const initialState: State = {
  user: {},
  reloadPage: false,
}
export const reducer = (state = initialState, action: fromActions.Actions): State => {
  switch (action.type) {
    case fromActions.SET_AGE: {
      const { payload: newAge } = action
      state.user
      const newUser = { ...state.user, age: newAge }
      const newState = { ...state, user: newUser }
      return newState
    }

    case fromActions.SET_NAME: {
      const { payload: newName } = action
      const newUser = { ...state.user, age: newName }
      const newState = { ...state, user: newUser }
      return newState
    }

    case fromActions.RELOAD_URL: {
      // const { type } = action
      // const { payload } = action // ERROR
      return {
        ...state,
        reloadPage: true,
      }
    }

    default:
      return state
  }
}
