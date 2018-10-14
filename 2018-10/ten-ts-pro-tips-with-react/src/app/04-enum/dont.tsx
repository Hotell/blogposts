export {}

enum Response {
  No,
  Yes,
}

function respond(recipient: string, message: Response) {
  // ...
}

enum Colors {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

function favoriteColor(name: string, color: Colors) {
  // ...
}

// TEST

{
  // Enums - literal type narrowing

  // $ExpectError 💥 NOPE  !!!
  const test: Response.No = 4
  // $ExpectError
  const test2: Response.Yes = Response.No
  // $ExpectError
  const test3: Response.Yes = 'hello'

  // $ExpectError 💥 NOPE  !!!
  respond('unknown', 4)
  respond('unknown', Response.No)
  respond('unknown', Response.Yes)
  // $ExpectError
  respond('unknown', 'ups')
}

{
  // String Enums

  // $ExpectError
  const test: Colors.Red = 'RED'
  // $ExpectError
  const test2: Colors = 'RED'
  const test3: Colors = Colors.Red

  // $ExpectError
  favoriteColor('unknown', 'RED')
  favoriteColor('unknown', Colors.Red)
  favoriteColor('unknown', Colors.Green)
}
