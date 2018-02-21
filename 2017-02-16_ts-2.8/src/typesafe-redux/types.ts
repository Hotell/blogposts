// interface Action<T extends string, P> {
//   type: T
//   payload?: P
// }
export interface Action<T extends string> {
  type: T
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

export type FunctionType = (...args: any[]) => any
export type ActionsUnion<A extends { [ac: string]: FunctionType }> = ReturnType<A[keyof A]>
