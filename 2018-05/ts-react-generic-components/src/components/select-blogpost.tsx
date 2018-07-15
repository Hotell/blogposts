import React, { Component, SyntheticEvent } from 'react'

import './select.css'
import { isObject, isString, isBlank } from '../utils'

type MapType<T extends { [key: string]: any } = { [key: string]: any }> = T
type GenericProps = string | MapType
type Props<T extends GenericProps> = {
  // forbiden children
  children?: never
  // API
  items: T[]
  displayKey?: T extends string ? never : keyof T
  name: string
  label: string
  active?: T | null
  // UsE Function declaration instead of methods -> https://github.com/Microsoft/TypeScript/issues/25296
  // @TODO try to conditional type this one
  onSelect: (item: T | null, event?: SyntheticEvent<HTMLElement>) => void
}
type State<T extends GenericProps> = Readonly<{
  inputText: string
}>

const isObjectMap = <T extends GenericProps>(value: T): value is Exclude<T, string> =>
  isObject(value)

const createListId = <T extends Props<any>>({ name }: T) => `list-${name}`

const getOptionValue = <T extends GenericProps, K extends Props<T>['displayKey']>(
  selected: T | null,
  displayKey?: K
): string => {
  console.log('getValue:', { selected })

  if (isBlank(selected)) {
    return ''
  }

  // both checks ifString(selected) && isObject(selected) are needed, because our generic props Union wont get narrowed,
  // which is good and forces us to make our code better (more error prone)
  if (isString(selected)) {
    return selected
  }

  if (isString(displayKey) && isObject(selected)) {
    return selected[displayKey]
  }

  throw new Error(`selected is can be null/object map/string. You provided ${typeof selected}`)
}

const getInitialState = <T extends GenericProps>(props: Props<T>): State<T> => {
  const { active = null, displayKey } = props
  return {
    inputText: getOptionValue(active, displayKey),
  }
}

export class Select<T extends GenericProps> extends Component<Props<T>, State<T>> {
  readonly state = getInitialState(this.props)
  private connecListId = createListId(this.props)
  private readonly handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.currentTarget
    const selectedValue = this.getValidValueFromList(inputValue)

    this.setState(
      () => ({ inputText: inputValue }),
      () => (selectedValue ? this.props.onSelect(selectedValue) : this.invalidateSelectedValue())
    )
  }

  /**
   * call onSelect prop with null or '' to notify consumer that value within input is not valid
   */
  private invalidateSelectedValue() {
    this.props.onSelect(this.props.displayKey ? null : ('' as T))
  }

  private getValidValueFromList(value: string) {
    return this.props.items.find((item) => getOptionValue(item, this.props.displayKey) === value)
  }

  render() {
    const { inputText } = this.state
    const { name: fieldName, items, label, displayKey } = this.props

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
          {items.map((item, idx) => <option key={idx} value={getOptionValue(item, displayKey)} />)}
        </datalist>
      </div>
    )
  }
}
