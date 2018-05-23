import { render } from 'react-dom'
import { App } from './app'
import { createElement } from 'react'

const mountPoint = document.querySelector('#app')
const bootstrap = () => render(createElement(App), mountPoint)

bootstrap()
