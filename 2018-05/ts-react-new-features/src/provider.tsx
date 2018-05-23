import React, {
  SFC,
  cloneElement,
  isValidElement,
  Children,
  ReactElement,
  Component,
  ComponentType,
  createElement,
} from 'react'

/**
 * 1. clone children
 *
 * - this of course doesn't work, compiler is your friend here
 * - children is optional, in compile and run time
 * - we can use non null assertion in compiler via `!` this will though not fix our issue,
 * because only ReactElement can be cloned ( no string/number/boolean). So here TS is again telling you correctly that you are doing something wrong
 */
const Provider1: SFC = ({ children }) => {
  const extendedElement = cloneElement(children, {
    result: 1,
    onDecrement() {},
    onIncrement() {},
  })

  return <div>{extendedElement}</div>
}

/**
 * 1. fix A
 * - to fix this in compile time, we can explicitly set children to be ReactElement<any> or JSX.Element
 * - now with this if we would use invalid children in jsx expression, compiler will throw an error at us, which is good!
 */
type Provider1FixProps = {
  children: ReactElement<any>
}
const Provider1fixA: SFC<Provider1FixProps> = ({ children }) => {
  const extendedElement = cloneElement(children, {
    result: 1,
    onDecrement() {},
    onIncrement() {},
  })

  return <div>{extendedElement}</div>
}

const ProviderFix1AApp = () => {
  //    TS: error text,boolean,number is not a ReactElement
  //   return <Provider1fix>just text</Provider1fix>
  //   return <Provider1fix>{111}</Provider1fix>
  //   return <Provider1fix>{true}</Provider1fix>

  //    TS: error children needs to be ReactElement not ReactElement[]
  //   return (
  //     <Provider1fix>
  //       <div>hello</div>
  //       <div>hello</div>
  //     </Provider1fix>
  //   )

  // Valid in compile time ;)
  return (
    <Provider1fixA>
      <div>hello</div>
    </Provider1fixA>
  )
}

/**
 * 1. fix B
 * - we can fix this on runtime via Children.only
 * - Children.only guarantees that result is ReactElement, so our compile error is mitigated,
 * and we are safe in runtime as well
 * - with this though, we don't have JSX compile time checking when we wanna use our Provider with some children
 */
const Provider1fixB: SFC = ({ children }) => {
  const extendedElement = cloneElement(Children.only(children), {
    result: 1,
    onDecrement() {},
    onIncrement() {},
  })

  return <div>{extendedElement}</div>
}

const ProviderFix1BApp = () => {
  //   No errors at all cause children is optional, within SFC mapped type, so all following expression are valid on compile level
  return <Provider1fixB>just text</Provider1fixB>
  //   return <Provider1fixB>{111}</Provider1fixB>
  //   return <Provider1fixB>{true}</Provider1fixB>
  //    TS: error children needs to be ReactElement not ReactElement[]
  //   return (
  //     <Provider1fixB>
  //       <div>hello</div>
  //       <div>hello</div>
  //     </Provider1fixB>
  //   )
  // return (
  //   <Provider1fixA>
  //     <div>hello</div>
  //   </Provider1fixA>
  // )
}

/**
 * 1. fix A+B
 * - we can combine both fixes to get best DX experience with both compile and runtime checks,
 * simply by combining custom defintion of children + Children.only constraint
 */

type ProviderPropsAB = {
  children: ReactElement<any>
}
const ProviderFixAB: SFC<ProviderPropsAB> = ({ children }) => {
  const extendedElement = cloneElement(Children.only(children), {
    result: 1,
    onDecrement() {},
    onIncrement() {},
  })

  return <div>{extendedElement}</div>
}

const ProviderFix1ABApp = () => {
  //  TS: errors  because those children are not ReactElement
  //
  // return <ProviderFixAB>just text</ProviderFixAB>
  //   return <ProviderFixAB>{111}</ProviderFixAB>
  //   return <ProviderFixAB>{true}</ProviderFixAB>
  //    TS: error children needs to be ReactElement not ReactElement[]
  //   return (
  //     <ProviderFixAB>
  //       <div>hello</div>
  //       <div>hello</div>
  //     </ProviderFixAB>
  //   )
  // compile and runtime valid
  return (
    <ProviderFixAB>
      <div>hello</div>
    </ProviderFixAB>
  )
}

// ===============================

/**
 * 2. strictly typed props to be assigned via cloneElement
 *
 * In all previous examples we have provide props that we wanna add to our cloned child.
 * What you we didn't see was that those props are not compule time safe and we can pass literaly anything to our Element to be cloned
 */
type ProviderProps = {
  children: ReactElement<any>
}
const Provider: SFC<ProviderProps> = ({ children }) => {
  // we are pasting arbitrary props, whops!!!
  const extendedElement = cloneElement(Children.only(children), {
    resultzzzz: 1,
    onDecrementFoo() {},
    onIncrement() {},
    who: 'Me Me Me !',
  })

  return <div>{extendedElement}</div>
}

/**
 * 2. fix
 *
 * - we can fix it, by providing explicit set of generics that can be used with our particular Children element
 * - if we set this just for children props it won't work, because weak type annotation of Children.only that just returns ReactElement<any> which kills further type flow,
 * so we need to set the genericc type of cloneElement explicitly
 * - PLease note, that by providing `children: ReactElement<ChildrenProps>` you won't get proper compile type checking, if your chil componen implements allowed props,
 * because JSX.children is a black box. so typescript sees it only as ReactElement, ReactElement[], string, number, boolean, null
 * - Also if you wanna use this pattern in genercic way, you are out of luck as there is no mechanism to dynamically set generic Children, as I mentioned before -> children props are kinda black box for TS with JSX
 */
type ChildrenProps = {
  result: number
  onDecrementFoo(): void
  onIncrement(): void
} & {
  who: string
  callMe(): void
}
type ProviderProps2 = {
  children: ReactElement<ChildrenProps>
}
const Provider2: SFC<ProviderProps2> = ({ children }) => {
  const extendedElement = cloneElement<ChildrenProps>(Children.only(children), {
    result: 1,
    onDecrementFoo() {},
    onIncrement() {},
    callMe() {},
  })

  return <div>{extendedElement}</div>
}

/**
 * 2. making Provider generic
 * - although this wont have any effect during compile time, as Children are blackBox kinda elements in TS
 */
type ChildrenPropsGeneric<T extends object = {}> = T
type ProviderProps2Generic<T extends object = {}> = {
  children: ReactElement<ChildrenPropsGeneric<T>>
}
const Provider2Generic = <T extends object>({ children }: ProviderProps2Generic<T>) => {
  const extendedElement = cloneElement<ChildrenPropsGeneric<T>>(Children.only(children))

  return <div>{extendedElement}</div>
}

const Child: SFC<Partial<ChildrenProps>> = ({ who }) => <div>hello {who}</div>

const GenericProviderApp = () => {
  ;<>
    {/* no compile errors :( */}
    <Provider2Generic<ChildrenProps>>
      <Child />
    </Provider2Generic>
    <Provider2Generic<ChildrenProps>>
      <div>Hello</div>
    </Provider2Generic>
  </>
}

/**
 * 3. using children props for `cloneElements` strict typing
 *
 * As we showcased in step 2. we can constraint `cloneElement` to strictly typed props.
 * This is ok, but creates kinda tight coupling, so it's not very feasible for generic provider like components.
 * So let's use Provider2 with new Child component which implements props that gonna be added via cloneElement/
 */
const ChildCmp: SFC<ChildrenProps> = ({ who, callMe }) => (
  <>
    <div>hello {who}</div>
    <button onClick={callMe}>call me</button>
  </>
)

const App1 = () => {
  return (
    <Provider>
      <ChildCmp />
    </Provider>
  )
}

/**
 * whoops! now we have a compile error, well because we didn't provided props to childCmp explicitly but via cloneElements from within Parent component,
 * which is kinda a black magic, don't you think ?
 * 
 * Question is how to solve this?
 * 
 * - we can make all <ChildCmp> props optional via Partial mapped type. 
 * That's the quickest solution, problem is that now, our implementation may not be accurate, 
 * if we wanna distinct between required and optional props on ChildCmp, not to mention that if you're doing some operations with those props within component,
 * now you must use safe navigation operator `!` to tell TS that hey this is not undefined | T, it's T trust me! So with solving one issue we introduced a new one, ugh.... :-/
 * 
 * ```ts
 * const ChildCmp: SFC<Partial<ChildrenProps>> = ({who, callMe}) => (
  <>
    // all props are now undefined or value... not good
    <div>hello {who}</div>
    <button onClick={callMe}>call me</button>
  </>
)
 * ``` 
 */

/**
 * 3. fix A
 * we can destructure within our function instead in arguments declaration and cast props back to be non optional
 */
const ChildCmpFix1: SFC<Partial<ChildrenProps>> = props => {
  const { who, callMe } = props as Required<ChildrenProps>
  return (
    <>
      <div>hello {who}</div>
      <button onClick={callMe}>call me</button>
    </>
  )
}

const App2 = () => {
  return (
    <Provider>
      <ChildCmpFix1 />
    </Provider>
  )
}

/**
 * 3. fix B
 * We can apply similar pattern as for defaultProps. So creating a high order identity function which just changes props definition of our child.
 */
type ProviderPropsSmart = {
  children: ReactElement<any>
}
type ProviderEnhancedProps = {
  result: number
  onDecrement(): void
  onIncrement(): void
}
class ProviderSmart extends Component {
  static withEnhancedProps<P extends object>(ChildCmp: ComponentType<P>) {
    type PropsExcludingEnhanced = Omit<P, keyof ProviderEnhancedProps>
    // type PropsExcludingEnhanced = Pick<P, Exclude<keyof P, keyof ProviderEnhancedProps>>
    type RecomposedProps = Partial<ProviderEnhancedProps> & PropsExcludingEnhanced
    // type PropsExcludingDefaultProps = Pick<Props, Exclude<keyof Props, keyof DefaultProps>>;
    // type RecomposedProps = Partial<DefaultProps> & PropsExcludingDefaultProps;
    // return ChildCmp as ComponentType<any> as ComponentType<Omit<P,keyof ProviderEnhancedProps>>
    return (ChildCmp as ComponentType<any>) as ComponentType<RecomposedProps>
  }
  render() {
    const { children } = this.props
    const extendedElement = cloneElement<ProviderEnhancedProps>(Children.only(children), {
      result: 1,
      onDecrement() {},
      onIncrement() {},
    })

    return <div>{extendedElement}</div>
  }
}

type ChildProps = {
  result: number
  onDecrement(): void
  onIncrement(): void
  who: string
  callMe(): boolean
}
const ChildCmpFix2 = (props: ChildProps) => {
  const { who, callMe, result, onIncrement, onDecrement } = props
  return (
    <>
      <div>hello {who}</div>
      <button onClick={callMe}>call me</button>
      <hr />
      <div>Result: {result}</div>
      <button onClick={onIncrement}>inc</button>
      <button onClick={onDecrement}>dec</button>
    </>
  )
}

const ChildCmpFix2Modified = ProviderSmart.withEnhancedProps(ChildCmpFix2)

const App3 = () => {
  return (
    <Provider>
      <ChildCmpFix2Modified who="Martin" callMe={() => true} />
    </Provider>
  )
}

/**
 * Summary:
 *
 * As we saw enhancing children via `cloneElement` is rather tricky to maintain appropriate compile time safety
 * For those reasons it is always better to use renderProps pattern, or DI pattern via context + HoC.
 *
 * Typesafety within templates remains superb with React ( JSX ) in comparison with any existing solutions nowadays ( angular - some type safety, vue - none)
 */

/**
 * Bonus:
 * Escaping the JSX children types Black box
 *
 * As described in "2. making Provider generic" if we annotate children with anything more specific than default JSX.Element | JSX.Element[] | string | number | boolean | null ,
 * compiler will not catch this, and our efforts are uselles. That's by design as TS cannot innfer deep recursive trees ( which JSX is ofc ).
 * We can mitigate this by avoiding JSX and using imperative calls instead
 *
 * Example:
 */

type TabsProps = {
  children: ReactElement<TabProps>[]
}
const Tabs = ({ children }: TabsProps) => {
  return <div>{children}</div>
}

type TabProps = {
  active?: boolean
  title: string
}
const Tab: SFC<TabProps> = ({ children }) => {
  return <div>{children}</div>
}

// This doesn't work
const TabsApp = () => {
  return (
    <div>
      <Tabs>
        <div>sdfdsf</div>
        <Tab title="one" />
        <Tab title="two" />
      </Tabs>
    </div>
  )
}

const TabsAppWorks = () => {
  return createElement(
    'div',
    null,
    createElement<TabsProps>(
      Tabs,
      null,
      createElement('div'),
      createElement(Tab, { title: 'one' }),
      createElement(Tab, { title: 'two' })
    )
  )
}
