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
  static readonly is = 'my-toggleable-public'
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = Toggleable.template

    this.view = {
      title: this.shadowRoot!.querySelector('.title') as HTMLElement,
      content: this.shadowRoot!.querySelector('.content') as HTMLSlotElement,
    }
  }

  private view: {
    title: HTMLElement
    content: HTMLSlotElement
  }
  private _title = 'No title provided'
  set title(value: string) {
    this._title = value
    this.render()
  }
  get title() {
    return this._title
  }

  private _show = false
  set show(value: boolean) {
    this._show = value
    this.render()
  }
  get show() {
    return this._show
  }

  connectedCallback() {
    this.render()
    this.addEventListener('click', this.handleShowToggle)
  }
  render() {
    this.view.title.textContent = this.title
    this.view.content.hidden = this.show
  }
  disconectedCallback() {
    this.removeEventListener('click', this.handleShowToggle)
  }

  private handleShowToggle = (event: Event) => {
    event.preventDefault()
    this.show = !this.show
  }
}

customElements.define(Toggleable.is, Toggleable)
