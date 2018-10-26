export const Todo = (description: string) => ({
  id: String(Date.now()),
  done: false,
  description,
})

export interface Todo extends ReturnType<typeof Todo> {}
