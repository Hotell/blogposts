import { createElement } from 'react'
import { render } from 'react-dom'

import './style.css'

import { App } from './app/app'

const bootstrap = () => {
  const mountPoint = document.querySelector('#app')
  if (!mountPoint) {
    throw new Error('#app - mount point not found')
  }

  // mountPoint.innerHTML = `
  // <h1>Hello Vite!</h1>
  // <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  // `
  render(createElement(App), mountPoint)
}

bootstrap()
