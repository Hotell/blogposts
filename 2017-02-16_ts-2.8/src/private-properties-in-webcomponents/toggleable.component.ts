export const titleProp = Symbol('title')
export const showProp = Symbol('show')
const viewProp = Symbol('view')
const toggle = Symbol('toggle')

export class Toggleable extends HTMLElement {
  static readonly template = (document.createElement('template').innerHTML = `
    <style>
      h2 {
        cursor: pointer;
        padding: 1rem;
        margin-bottom: 0;
        transition: background-color ease-out 250ms;
        box-shadow: 0px -6px 12px -7px;
      }

      h2:hover {
        background-color: #eee;
      }
    </style>
    <h2 class="title">Hello</h2><div class="content"><slot ></slot></div>
  `)
  static readonly is = 'my-toggleable'
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = Toggleable.template

    this[viewProp] = {
      title: this.shadowRoot!.querySelector('.title') as HTMLElement,
      content: this.shadowRoot!.querySelector('.content') as HTMLSlotElement,
    }
  }

  [viewProp]: {
    title: HTMLElement
    content: HTMLSlotElement
  };

  [titleProp] = 'No title provided'
  set title(value: string) {
    this[titleProp] = value
    this.render()
  }
  get title() {
    return this[titleProp]
  }

  [showProp] = false
  set show(value: boolean) {
    this[showProp] = value
    this.render()
  }
  get show() {
    return this[showProp]
  }

  connectedCallback() {
    this.render()
    this.addEventListener('click', this[toggle])
  }
  render() {
    this[viewProp].title.textContent = this.title
    this[viewProp].content.hidden = this.show
  }
  disconectedCallback() {
    this.removeEventListener('click', this[toggle])
  }

  [toggle] = (event: Event) => {
    event.preventDefault()
    this.show = !this.show
  }
}

customElements.define(Toggleable.is, Toggleable)
