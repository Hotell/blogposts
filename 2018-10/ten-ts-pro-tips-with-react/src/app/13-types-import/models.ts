export class Todo {
  id: number
  done: boolean
  description: string
  constructor(description: string) {
    this.description = description
    this.done = false
    this.id = 123
  }
}
