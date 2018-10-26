export {}

interface UserIndexedDictionary {
  [id: number]: User
}

interface User {
  email: string
}

const dictionary: UserIndexedDictionary = {
  1: {
    email: 'foo@bar.com',
  },
  2: {
    email: 'baz@moo.com',
  },
}
