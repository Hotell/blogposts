import { Toggleable, showProp, titleProp } from './toggleable.component'
import { Toggleable as ToggleablePublic } from './toggleable-public.component'

import './toggleable-public.component'
import './toggleable.component'

let foo = new Toggleable()

const main = ({ titles: [first, second] }: { titles: string[] }) => {
  const state = {
    show: Boolean(),
  }

  const toggleablePublic = document.querySelector(ToggleablePublic.is) as ToggleablePublic
  const toggleable = document.querySelector(Toggleable.is) as Toggleable
  const button = document.querySelector('button')!

  // set title
  toggleable.title = first
  toggleablePublic.title = second

  button.addEventListener('click', handleShowContents)

  function handleShowContents(event: Event) {
    state.show = !state.show
    toggleable.show = state.show
    toggleablePublic.show = state.show
  }
}

main({ titles: ['My title', 'Another title'] })
