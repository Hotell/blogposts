import React, { Component, SyntheticEvent } from 'react'

import './select.css'
import { isObject } from '../utils'

type GenericProps = Primitives | object
type Primitives = string | number
type Props<T extends GenericProps> = {
  items: T[]
  name: string
  label: string
  active?: T
  onSelect(item: T, event?: SyntheticEvent<HTMLElement>): void
}

const createListId = ({ name }: Props<GenericProps>) => `list-${name}`
const handleChange = (props: Props<GenericProps>) => (event: SyntheticEvent<HTMLInputElement>) => {
  const { value, name } = event.currentTarget
  const valueToEmit = props.items.find((item) => {
    const valueToCompare = isObject(item) ? (item as any).uname : item
    return valueToCompare === value
  })

  if (valueToEmit) {
    props.onSelect(valueToEmit, event)
  }
}
const renderItem = (item: GenericProps) => {
  const data = isObject(item)
    ? { key: (item as any).uname, value: (item as any).uname }
    : { key: item, value: item }

  return <option {...data} />
}

export class Select<T extends GenericProps> extends Component<Props<T>> {
  private connecListId = createListId(this.props)
  /* private readonly handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    const isValueValid = this.props.items.find((item) => item === value)

    if (isValueValid) {
      // @TODO report error to TS
      // ERROR: [ts] Argument of type 'string' is not assignable to parameter of type 'T'.
      // `as T` is needed
      this.props.onSelect(value as T)
    }
  } */

  render() {
    const { connecListId } = this
    const { name, items, label, onSelect } = this.props
    return (
      <div className="select">
        <label htmlFor={name}>{label}:</label>
        <input list={connecListId} name={name} onChange={handleChange(this.props)} />
        <datalist id={connecListId}>{items.map(renderItem)}</datalist>
      </div>
    )
  }
}

export const SelectSFC = <T extends GenericProps>(props: Props<T>) => {
  const connecListId = createListId(props)
  const { name, items, label, onSelect } = props

  return (
    <div className="select">
      <label htmlFor={name}>{label}:</label>
      <input list={connecListId} name={name} onChange={handleChange(props)} />
      <datalist id={connecListId}>{items.map(renderItem)}</datalist>
    </div>
  )
}
