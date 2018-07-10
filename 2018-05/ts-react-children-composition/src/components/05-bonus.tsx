import { Component, ReactNode } from 'react'

// (1)
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

type Props = { onToggle: (on: boolean) => void } & RenderProps

// (2)
type RenderProps = XOR<{ children: (api: API) => ReactNode }, { render: (api: API) => ReactNode }>

// (3)
type API = ReturnType<Toggle['getApi']>

// (4)
type State = Readonly<typeof initialState>
const initialState = { on: false }

export class Toggle extends Component<Props, State> {
  // (5)
  readonly state = initialState
  // (6)
  private toggle = () =>
    this.setState(({ on }) => ({ on: !on }), () => this.props.onToggle(this.state.on))
  // (7)
  private getApi() {
    return {
      on: this.state.on,
      toggle: this.toggle,
    }
  }
  render() {
    // (8)
    if (hasRender(this.props)) {
      return this.props.render(this.getApi())
    }

    // (9)
    if (hasChildren(this.props)) {
      return this.props.children(this.getApi())
    }

    // (10)
    throw new Error('children is mandatory and needs to be a function!')
  }
}

type HasRenderProp<T> = T extends { render: (props: any) => ReactNode } ? T : never
type HasChildrenProp<T> = T extends { children: (props: any) => ReactNode } ? T : never
type IsFunction<T> = T extends (...args: any[]) => any ? T : never

const hasRender = <T extends {}>(value: T): value is HasRenderProp<T> =>
  'render' in value && isFunction((value as HasRenderProp<T>).render)
const hasChildren = <T extends {}>(value: T): value is HasChildrenProp<T> =>
  'children' in value && isFunction((value as HasChildrenProp<T>).children)

const isFunction = <T extends {}>(value: T): value is IsFunction<T> => typeof value === 'function'
