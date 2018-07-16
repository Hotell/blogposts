import React, { Component, SyntheticEvent, ReactNode, Fragment } from 'react'

import './select.css'
import { isObject, isString, isBlank } from '../utils'

type Props<T extends GenericProps> = {
  /**
   * required children as a function
   */
  children: (item: T) => ReactNode
  // API
  items: T[]
  name: string
  label: string
  active?: T | null
  /**
   * if T is object map, dissallow displayKey
   */
  displayKey?: T extends string ? never : keyof T
  /**
   * Always use Function declaration instead of methods for stricter type checking -> https://github.com/Microsoft/TypeScript/issues/25296
   */
  onSelect: (item: T | null, event?: SyntheticEvent<HTMLElement>) => void
}
type State = Readonly<ReturnType<typeof getInitialState>>
type GenericProps = string | { [key: string]: any }

const createListId = <T extends Props<any>>({ name }: T) => `list-${name}`

const getItemValue = <T extends GenericProps, K extends Props<T>['displayKey']>(
  selected: T | null,
  displayKey?: K
): string => {
  console.log('getValue:', { selected })

  if (isBlank(selected)) {
    return ''
  }

  // both checks if String(selected) && isObject(selected) are needed, because our generic props Union wont get narrowed,
  // which is good and forces us to make our code better (more error prone)
  if (isString(selected)) {
    return selected
  }

  if (isString(displayKey) && isObject(selected)) {
    return selected[displayKey]
  }

  throw new Error(`selected must be typeof null/object map/string. You provided ${typeof selected}`)
}

const getInitialState = <T extends GenericProps>(props: Props<T>) => {
  const { active = null, displayKey } = props
  return {
    inputText: getItemValue(active, displayKey),
  }
}

export class Select<T extends GenericProps> extends Component<Props<T>, State> {
  readonly state: State = getInitialState(this.props)
  private connecListId = createListId(this.props)

  private readonly handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.currentTarget
    const selectedValue = this.getItemFromListByValue(inputValue)

    this.setState(
      () => ({ inputText: inputValue }),
      // after internal state update call prop.onSelect
      () => this.handleOnSelect(selectedValue)
    )
  }

  private handleOnSelect(value?: T) {
    const selectedValue = value
      ? value
      : // call onSelect prop with null or '' to notify consumer that value within input is not valid
        this.props.displayKey
        ? null
        : ('' as T)

    this.props.onSelect(selectedValue)
  }

  private getItemFromListByValue(value: string) {
    return this.props.items.find((item) => getItemValue(item, this.props.displayKey) === value)
  }

  render() {
    const { inputText } = this.state
    const { name: fieldName, items, label, children } = this.props

    return (
      <div className="select">
        <label htmlFor={fieldName}>{label}:</label>
        <input
          list={this.connecListId}
          name={fieldName}
          value={inputText}
          onChange={this.handleChange}
        />
        <datalist id={this.connecListId}>
          {items.map((item, idx) => <Fragment key={idx}>{children(item)}</Fragment>)}
        </datalist>
      </div>
    )
  }
}
