import { Children, ReactNode, ComponentType } from 'react'

export const isEmptyChildren = (children: ReactNode) => Children.count(children) === 0
export const isFunction = <T extends (...args: any[]) => any>(value: any): value is T =>
  typeof value === 'function'
export const getComponentName = (component: ComponentType<any>) =>
  component.displayName || (component as any).name
export const getHocComponentName = (hocName: string, component: ComponentType<any>) =>
  `${hocName}(${getComponentName(component)})`

export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: ComponentType<P>
) => {
  // we are extracting props that need to be required
  type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>

  // we are re-creating our props definition by creating and intersection type
  // between all original props mapped to be optional and required to be required
  type RecomposedProps = Partial<DP> & PropsExcludingDefaults

  // here we set our defaultProps
  Cmp.defaultProps = defaultProps

  // we override return type definition by turning type checker off
  // for original props  and setting the correct return type
  return (Cmp as ComponentType<any>) as ComponentType<RecomposedProps>
}
