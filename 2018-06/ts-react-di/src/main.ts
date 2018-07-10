import './polyfills'

import { createElement } from 'react'
import { render } from 'react-dom'

import './style.css'

import { App } from './app/app'

const bootstrap = () => {
  const mountPoint = document.querySelector('#app')
  render(createElement(App), mountPoint)
}

bootstrap()
