const template = document.createElement('template')
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box
    }

    :host {
      display: inline-block;
      box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
      background-color: white;
      border-radius: 3px;
      padding: 16px;
    }

    ::slotted(*) {
      padding: 16px;
      padding-left: 32px;
      background-color: #ccc;
      border: 1px solid black;
    }
  </style>
  <h3></h3>
    <slot></slot>
  </div>
`

const root = Symbol('root')
const view = Symbol('view')
const prop_who = Symbol('who')
const prop_greeting = Symbol('greeting')

export class Greeter extends HTMLElement {
  static get observedAttributes() {
    return ['who', 'greeting']
  }
  get who(): string | null {
    return this[prop_who]
  }
  set who(value: string | null) {
    this[prop_who] = value
    this.render()
  }
  private [prop_who]: string | null = null

  get greeting() {
    return this[prop_greeting]
  }
  set greeting(value: string | null) {
    this[prop_greeting] = value
    this.render()
  }
  private [prop_greeting]: string | null = null;

  [root]: ShadowRoot;
  [view]: {
    title: HTMLHeadingElement
  }

  constructor() {
    super()
    this[root] = this.attachShadow({ mode: 'open' })
    this[root].appendChild(template.content.cloneNode(true))
    this[view] = {
      title: this[root].querySelector('h3') as HTMLHeadingElement,
    }
  }

  connectedCallback() {}

  attributeChangedCallback(
    name: 'who' | 'greeting',
    oldValue: string,
    newValue: string
  ) {
    const hasValue = newValue !== null
    const hasNewValue = newValue !== oldValue

    if (!hasNewValue) {
      return
    }

    switch (name) {
      case 'who':
        this.who = newValue
        break
      case 'greeting':
        this.greeting = newValue
        break
      default:
        break
    }
  }

  render() {
    const { who, greeting } = this
    this[view].title.textContent = `${greeting} ${who} !`
  }
}
