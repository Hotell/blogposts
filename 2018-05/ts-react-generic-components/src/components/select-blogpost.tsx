import React, { Component, SyntheticEvent } from 'react'

import './select.css'
import { isObject } from '../utils'

type MapType<T extends { [key: string]: any } = { [key: string]: any }> = T
type GenericProps = string | MapType
type Props<T extends GenericProps> = {
  items: T[]
  displayKey?: T extends MapType ? keyof T : never
  name: string
  label: string
  active?: T | null
  // @TODO try to conditional type this one
  onSelect(item: T | null, event?: SyntheticEvent<HTMLElement>): void
}
type State<T extends GenericProps> = {
  selected: T | null
}

const isMapType = <T extends GenericProps>(value: T): value is Exclude<T, string> =>
  value != undefined &&
  !Array.isArray(value) &&
  typeof value !== 'function' &&
  typeof value === 'object'
const createListId = ({ name }: Props<GenericProps>) => `list-${name}`

export class Select<T extends GenericProps> extends Component<Props<T>, State<T>> {
  // static OptionsList = (props) => {
  //   (item: GenericProps) => {
  //     const selected = this.getSelectedValue()
  //     const data = isMapType(item)
  //       ? { key: (item as any).uname, value: (item as any).uname }
  //       : { key: item, value: item }

  //     return <option {...data} />
  //   }
  // }
  readonly state = {
    selected: this.props.active || null,
  }
  private connecListId = createListId(this.props)
  private readonly handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.currentTarget
    const selectedValue = this.props.items.find((item) => this.getValue(item) === inputValue)

    if (selectedValue) {
      this.setState(
        (prevState) => ({ selected: selectedValue }),
        () => this.props.onSelect(selectedValue)
      )
      return
    }

    this.props.onSelect(this.props.displayKey ? null : ('' as T))
  }

  private getValue(selected: T | null): string {
    console.log({ selected })
    if (selected == undefined) {
      return ''
    }

    const { displayKey } = this.props
    return isMapType(selected) && displayKey ? selected[displayKey] : selected
  }

  render() {
    const { connecListId } = this
    const { selected } = this.state
    const { name: fieldName, items, label } = this.props
    const selectedValue = this.getValue(selected)

    console.log({ selectedValue })

    return (
      <div className="select">
        <label htmlFor={fieldName}>{label}:</label>
        <input
          list={connecListId}
          name={fieldName}
          defaultValue={selectedValue}
          onChange={this.handleChange}
        />
        <datalist id={connecListId}>
          {items.map((item, idx) => <option key={idx} value={this.getValue(item)} />)}
        </datalist>
      </div>
    )
  }
}
