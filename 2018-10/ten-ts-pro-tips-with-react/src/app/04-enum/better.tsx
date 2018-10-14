export {}

type Response = 1 | 2

function respond(recipient: string, message: Response) {
  // ...
}

type Colors = 'RED' | 'GREEN' | 'BLUE'

function favoriteColor(name: string, color: Colors) {
  // ...
}

// TESTS

{
  // Enums - literal type narrowing

  // $ExpectError 👉 yup catched 👌
  const test: Response = 4
  // NO ERROR
  const test2: Response = Response.No
  // $ExpectError
  const test3: Response = 'hello'

  // $ExpectError 👉 yup catched 👌
  respond('unknown', 4)
  respond('unknown', Response.Yes)
  respond('unknown', Response.No)
  respond('unknown', 1)
  // $ExpectError
  respond('unknown', 'ups')
}

{
  // String Enums

  // 👉 yup no ERROR 👌
  const test: Colors = 'RED'
  // 👉 yup no ERROR 👌
  const test2: Colors = 'RED'
  const test3: Colors = Colors.Red

  // 👉 yup no ERROR 👌
  favoriteColor('unknown', 'RED')
  favoriteColor('unknown', Colors.Red)
  favoriteColor('unknown', Colors.Green)
}
