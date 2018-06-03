import { Children, ReactNode, ComponentType } from 'react'

export const isEmptyChildren = (children: ReactNode) => Children.count(children) === 0
export const isFunction = <T extends (...args: any[]) => any>(value: any): value is T =>
  typeof value === 'function'

type Nullable<T> = T extends null | undefined ? T : never
export const isPresent = <T>(value: T): value is NonNullable<T> => value != null
export const isBlank = <T>(value: T): value is Nullable<T> => value == null

const main = () => {
  type User = {
    name: string
    age: undefined | number
  }

  const user: User = { name: 'Martin', age: undefined }
  const { age } = user
  if (isBlank(age)) {
    age
  }
  if (isPresent(age)) {
    age
  }
}
export const getComponentName = (component: ComponentType<any>) =>
  component.displayName || (component as any).name
export const getHocComponentName = (hocName: string, component: ComponentType<any>) =>
  `${hocName}(${getComponentName(component)})`

export type DefaultProps<P extends object, DP extends Partial<P> = Partial<P>> = Partial<DP> &
  Pick<P, Exclude<keyof P, keyof DP>>

// we are re-creating our props definition by creating and intersection type
// between all original props mapped to be optional and required to be required
export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: ComponentType<P>
): ComponentType<DefaultProps<P, DP>> => {
  // we are extracting props that need to be required
  // type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>

  // we are re-creating our props definition by creating and intersection type
  // between all original props mapped to be optional and required to be required
  // type RecomposedProps = Partial<DP> & PropsExcludingDefaults

  // here we set our defaultProps
  Cmp.defaultProps = defaultProps

  // we override return type definition by turning type checker off
  // for original props  and setting the correct return type
  // return Cmp as ComponentType<any>
  return Cmp as ComponentType<any>
}

type GetDefaultProps<P extends object, DP extends Partial<P> = Partial<P>> = DP &
  Pick<P, Exclude<keyof P, keyof DP>>
type GetDefaultPropsFactory<P extends object, DP extends Partial<P> = Partial<P>> = (
  defaultProps: DP
) => (props: P) => GetDefaultProps<P, DP>

export const createPropsGetter = <DP extends object>(defaultProps: DP) => {
  return <P extends Partial<DP>>(props: P): GetDefaultProps<P, DP> =>
    ({ ...(defaultProps as object), ...(props as object) } as any)
}
export const getProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  props: P,
  defaultProps: DP
): GetDefaultProps<P, DP> => {
  // type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>
  // type RecomposedProps = DP & PropsExcludingDefaults
  return { ...(defaultProps as object), ...(props as object) } as any
}
