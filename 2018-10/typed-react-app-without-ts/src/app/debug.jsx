import React from 'react'

// @ts-check

/**
 *
 * @param {{value:T}} param
 */
export const Debug = ({ value }) => <pre>{JSON.stringify(value, null, 2)}</pre>
