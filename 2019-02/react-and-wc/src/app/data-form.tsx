import {
  useReducer,
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  ReactNode,
} from 'react'
import React from 'react'

type Props<T extends object> = {
  initialData: T
  children?: (data: T) => ReactNode
  renderAsBlock?: boolean
  onChange?: (data: T) => void
}
export function DataForm<T extends object>({
  initialData,
  children,
  renderAsBlock,
  onChange,
}: Props<T>) {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (onChange) {
      onChange(data)
    }
  }, [data])

  const formFields = Object.keys(data)

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value, name: fieldName } = ev.target
    const newState = { ...(data as any), [fieldName]: value }
    setData(newState)
  }

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((fieldName) => {
        return (
          <div key={fieldName} className="form-group">
            <label>{fieldName}</label>
            <input
              name={fieldName}
              className={renderAsBlock ? 'input-block' : ''}
              value={data[fieldName] as string}
              onChange={handleChange}
            />
          </div>
        )
      })}
      {children ? children(data) : null}
    </form>
  )
}
