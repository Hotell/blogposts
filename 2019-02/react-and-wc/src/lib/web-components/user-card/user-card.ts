import nanoid from 'nanoid'

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
  <h4 class="user-name"></h4>
  <form>
   <li class="user-email"></li>
   <li class="user-age"></li>
  </form>

  </div>
`

interface User {
  uname: string
  email: string
  age: number
}

const root = Symbol('root')
const view = Symbol('view')
const prop_user = Symbol('user')

export class UserCard extends HTMLElement {
  get user(): User {
    return this[prop_user]
  }
  set user(value: User) {
    this[prop_user] = value
    this.render()
  }
  [prop_user]: User;

  [root]: ShadowRoot;
  [view]: {
    uname: HTMLElement
    email: HTMLElement
    age: HTMLElement
  }

  constructor() {
    super()
    this[root] = this.attachShadow({ mode: 'open' })
    this[root].appendChild(template.content.cloneNode(true))
    this[view] = {
      uname: this[root].querySelector('.user-name') as HTMLElement,
      email: this[root].querySelector('.user-email') as HTMLElement,
      age: this[root].querySelector('.user-age') as HTMLElement,
    }
  }

  connectedCallback() {}

  render() {
    const {
      user: { age, email, uname },
    } = this
    this[view].uname.textContent = uname
    this[view].email.textContent = email
    this[view].age.textContent = String(age)
  }
}
