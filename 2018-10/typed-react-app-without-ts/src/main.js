// @ts-check
import { createElement } from 'react'
import { render } from 'react-dom'

import './style.css'

import { App } from './app/app'

const bootstrap = () => {
  const mountPoint = document.querySelector('#app')
  render(createElement(App), mountPoint)
}

bootstrap()

if (module.hot) {
  module.hot.accept('./app/app', () => {
    const { App } = require('./app/app') // original imported value doesn't update, so you need to import it again
    // document.write(`HMR valueToLog: ${valueToLog}`);
    console.log('HMR 🌀')
    const mountPoint = document.querySelector('#app')
    render(createElement(App), mountPoint)
  })
}
