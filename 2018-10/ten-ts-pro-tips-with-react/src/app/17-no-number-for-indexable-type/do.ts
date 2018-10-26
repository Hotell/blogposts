export {}

interface UserIndexedDictionary {
  [id: string]: User
}

interface User {
  email: string
}

const dictionary: UserIndexedDictionary = {
  edksdjf12: {
    email: 'foo@bar.com',
  },
  okdjwns77: {
    email: 'baz@moo.com',
  },
}

Array
