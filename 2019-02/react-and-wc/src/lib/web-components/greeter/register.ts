import nanoid from 'nanoid'

import { Greeter } from './greeter'

export const registerElement = (name: string) => {
  const uniqeId = nanoid(4).toLowerCase()
  const elemName = `${name}-${uniqeId}`

  return customElements.define(name, Greeter)
}
