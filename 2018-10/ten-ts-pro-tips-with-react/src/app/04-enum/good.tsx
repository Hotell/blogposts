type EnumLiteralsOf<T extends object> = T[keyof T]

// merge implementation with "Enum" typed literal
// $ExpectType 1 | 2
export type Response = EnumLiteralsOf<typeof Response>
// $ExpectType Readonly<{ No: 1; Yes: 2; }>
export const Response = Object.freeze({
  // we need to explicit cast values to get proper literal type
  No: 1 as 1,
  Yes: 2 as 2,
})

function respond(recipient: string, message: Response) {
  // ...
}

// merge implementation with "Enum" typed literal
// $ExpectType "RED" | "GREEN" | "BLUE"
export type Colors = EnumLiteralsOf<typeof Colors>
// $ExpectType Readonly<{ Red: "RED"; Green: "GREEN"; Blue: "BLUE"; }>
export const Colors = Object.freeze({
  Red: 'RED' as 'RED',
  Green: 'GREEN' as 'GREEN',
  Blue: 'BLUE' as 'BLUE',
})

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
