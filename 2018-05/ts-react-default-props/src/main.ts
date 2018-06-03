import { render } from 'react-dom'
import { createElement } from 'react'
import { App } from './app/app'

const bootstrap = () => {
  const mountPoint = document.querySelector('#app')
  render(createElement(App), mountPoint)
}

bootstrap()
