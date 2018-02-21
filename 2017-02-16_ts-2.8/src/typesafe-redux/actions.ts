import { ActionsUnion, Action, ActionWithPayload } from './types'
import { createAction } from './action-helpers'

export const SET_AGE = '[core] set age'
export const SET_NAME = '[core] set name'
export const RELOAD_URL = '[router] Reload Page'

export const actions = {
  setAge: (age: number) => createAction(SET_AGE, age),
  setName: (name: string) => createAction(SET_NAME, name),
  reloadUrl: () => createAction(RELOAD_URL),
}

export type Actions = ActionsUnion<typeof actions>
