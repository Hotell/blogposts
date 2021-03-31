import { createElement } from 'react'
import { render } from 'react-dom'

import { App } from './app'

const bootstrap = () => {
  const mountPoint = document.querySelector('#app')
  render(createElement(App), mountPoint)
}

bootstrap()
