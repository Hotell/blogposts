// @ts-check

// ===============
// Model via Factory
// ===============

/**
 * @param {string} description
 */
export const Todo = (description) => ({
  id: String(Date.now()),
  description,
  done: false,
})

/**
 * @typedef {ReturnType<typeof Todo>} Todo
 */

// ===============
// Model via Class
// ===============
// export class Todo {
//   /**
//    * @param {string} description
//    */
//   constructor(description) {
//     this.id = String(Date.now())
//     this.description = description
//     this.done = false
//   }
// }
