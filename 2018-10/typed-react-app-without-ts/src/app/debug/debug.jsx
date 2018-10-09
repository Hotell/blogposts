// @ts-check
import React from 'react'

import './debug.css'

/**
 * @param {{children: ({[key:string]:unknown} | number | string | boolean)}} props
 */
export const Debug = ({ children }) => (
  <pre className="debug">{JSON.stringify(children, null, 2)}</pre>
)
