import { OperatorFunction } from 'rxjs/interfaces'
import { Observable } from 'rxjs/observable'
import { filter } from 'rxjs/operators'

import { ActionsOfType } from './types'

export function ofType<V, T1 extends string>(t1: T1): OperatorFunction<V, ActionsOfType<V, T1>>
export function ofType<V, T1 extends string, T2 extends string>(
  t1: T1,
  t2: T2
): OperatorFunction<V, ActionsOfType<V, T1 | T2>>
export function ofType<V, T1 extends string, T2 extends string, T3 extends string>(
  t1: T1,
  t2: T2,
  t3: T3
): OperatorFunction<V, ActionsOfType<V, T1 | T2 | T3>>
export function ofType<
  V,
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string
>(t1: T1, t2: T2, t3: T3): OperatorFunction<V, ActionsOfType<V, T1 | T2 | T3 | T4>>
export function ofType(...types: string[]) {
  return function(source: Observable<any>) {
    return source.pipe(filter(action => types.indexOf(action.type) !== -1)) as any
  }
}
