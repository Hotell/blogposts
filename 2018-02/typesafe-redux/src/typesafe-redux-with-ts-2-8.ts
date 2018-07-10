import { Action, ActionWithPayload } from './types'

type ActionFn<T extends string> = () => Action<T>
type ActionWithPayloadFn<T extends string, P> = (payload: P) => ActionWithPayload<T, P>

function action<T extends string>(type: T): ActionFn<T>
function action<T extends string, P>(type: T): ActionWithPayloadFn<T, P>
function action(type: string) {
  return (payload?: any) => (payload ? { type, payload } : { type })
}

function createAction<T extends string>(type: T): Action<T>
function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>
function createAction(type: string, payload?: any) {
  return payload ? { type, payload } : { type }
}

/* ******************************* */
// Action types

const SET_NAME = '[core] Set Name'
const SET_AGE = '[core] Set Age'
const RELOAD = '[router] Reload Page'

/* ******************************* */
// Actions with new  ReturnType mapped type

const setName = (name: string) => ({
  type: SET_NAME as typeof SET_NAME,
  payload: name,
})
const setAge = (age: number) => ({
  type: SET_NAME as typeof SET_AGE,
  payload: age,
})
const reloadURL = () => ({ type: RELOAD as typeof RELOAD })

type SetNameAction = ReturnType<typeof setName>
type SetAgeAction = ReturnType<typeof setAge>
type ReloadURLAction = ReturnType<typeof reloadURL>
type Actions = SetNameAction | SetAgeAction | ReloadURLAction

/* ******************************* */
// Actions via createAction function helper

const setName2 = (name: string) => createAction(SET_NAME, name)
const setAge2 = (age: number) => createAction(SET_AGE, age)
const reloadURL2 = () => createAction(RELOAD)

type SetNameAction2 = ReturnType<typeof setName2>
type SetAgeAction2 = ReturnType<typeof setAge2>
type ReloadURLAction2 = ReturnType<typeof reloadURL2>
type Actions2 = SetNameAction2 | SetAgeAction2 | ReloadURLAction2

/* ******************************* */
// Actions via action function helper

const setName3 = action<typeof SET_NAME, string>(SET_NAME)
const setAge3 = action<typeof SET_AGE, number>(SET_AGE)
const reloadURL3 = action(RELOAD)

type SetNameAction3 = ReturnType<typeof setName3>
type SetAgeAction3 = ReturnType<typeof setAge3>
type ReloadURLAction3 = ReturnType<typeof reloadURL3>
type Actions3 = SetNameAction3 | SetAgeAction3 | ReloadURLAction3

/* ******************************* */
// Actions via classes
class SetNameAction4 {
  readonly type = SET_NAME
  constructor(public payload: string) {}
}
class SetAgeAction4 {
  readonly type = SET_AGE
  constructor(public payload: number) {}
}
class ReloadURLAction4 {
  readonly type = RELOAD
}
type Actions4 = SetNameAction4 | SetAgeAction4 | ReloadURLAction4

/* ******************************* */
// Before TS 2.8

type SetNameAction5 = { type: typeof SET_NAME; payload: string }
type SetAgeAction5 = { type: typeof SET_AGE; payload: number }
type ReloadURLAction5 = { type: typeof RELOAD }

const setName5 = (name: string): SetNameAction5 => ({
  type: SET_NAME,
  payload: name,
})
const setAge5 = (age: number): SetAgeAction5 => ({
  type: SET_AGE,
  payload: age,
})
const reloadURL5 = (): ReloadURLAction5 => ({ type: RELOAD })
