import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs/observable/of'
import { tap, map } from 'rxjs/operators'

import { Actions, SET_AGE, actions } from './actions'
import { State } from './store'
import { ActionByType } from './types'

type SetAgeAction = ActionByType<Actions, typeof SET_AGE>

const epic: Epic<Actions, State> = actions$ => {
  return actions$.pipe(
    ofType<Actions, SetAgeAction>(SET_AGE),
    map(action => {
      const { type, payload: newAge } = action
      return actions.reloadUrl()
    })
  )
}

const epicWithChainOfType: Epic<Actions, State> = actions$ => {
  return actions$.ofType<SetAgeAction>(SET_AGE).pipe(
    map(action => {
      const { type, payload: newAge } = action
      return actions.reloadUrl()
    })
  )
}
