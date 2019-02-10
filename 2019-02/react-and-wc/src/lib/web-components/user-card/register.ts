import nanoid from 'nanoid'

import { UserCard } from './user-card'

export const registerElement = (name: string) => {
  const uniqeId = nanoid(4).toLowerCase()
  const elemName = `${name}-${uniqeId}`

  return customElements.define(name, UserCard)
}
