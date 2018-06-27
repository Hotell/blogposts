import { Epic } from 'redux-observable'
import { map } from 'rxjs/operators'

import { ofType } from './of-type'

import { ActionsOfType } from './types'
// import { ActionTypes, Actions } from './actions-with-enums'
import { SET_AGE, Actions } from './actions'
import { State } from './store'

// BEHOLD 100% type safe epic ! I ❤️ love it !
const epic: Epic<Actions, State> = (actions$) => {
  return actions$.pipe(
    // ofType(ActionTypes.SET_AGE),
    ofType(SET_AGE),
    map((action) => {
      const { type, payload: newAge } = action
      return Actions.reloadUrl()
    })
  )
}
