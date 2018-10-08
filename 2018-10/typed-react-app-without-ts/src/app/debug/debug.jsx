// @ts-check
import React from 'react'

import './debug.css'

/**
 * @param {{children:object | string | number | boolean}} param
 */
export const Debug = ({ children }) => (
  <pre className="debug">{JSON.stringify(children, null, 2)}</pre>
)
