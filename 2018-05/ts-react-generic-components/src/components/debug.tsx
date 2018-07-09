import React, { SFC, isValidElement } from 'react'

export const Debug: SFC = (props) => {
  if (isValidElement(props.children)) {
    throw new Error('ReactElement is not allowed!')
  }

  return <pre>{JSON.stringify(props.children)}</pre>
}
