import { ActionsUnion } from './types'
import { createAction } from './action-helpers'

export enum ActionTypes {
  SET_AGE = '[core] set age',
  SET_NAME = '[core] set name',
  RELOAD_URL = '[router] Reload Page',
}

export const Actions = {
  setAge: (age: number) => createAction(ActionTypes.SET_AGE, age),
  setName: (name: string) => createAction(ActionTypes.SET_NAME, name),
  reloadUrl: () => createAction(ActionTypes.RELOAD_URL),
}

export type Actions = ActionsUnion<typeof Actions>
