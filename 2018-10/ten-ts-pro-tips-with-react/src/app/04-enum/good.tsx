export {}

type ValueOfEnum<T extends object> = T[keyof T]

const Response = Object.freeze({
  No: 1 as 1,
  Yes: 2 as 2,
})

function respond(
  recipient: string,
  message: ValueOfEnum<typeof Response>
): void {
  // ...
}

const Colors = Object.freeze({
  Red: 'RED' as 'RED',
  Green: 'GREEN' as 'GREEN',
  Blue: 'BLUE' as 'BLUE',
})

function favoriteColor(name: string, color: ValueOfEnum<typeof Colors>) {}

// TEST

{
  // Enums - literal type narrowing

  // $ExpectError 👉 yup catched 👌
  const test: typeof Response.No = 4
  // $ExpectError
  const test2: typeof Response.Yes = Response.No
  // $ExpectError
  const test3: typeof Response.Yes = 'hello'

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
  const test: typeof Colors.Red = 'RED'
  // 👉 yup no ERROR 👌
  const test2: ValueOfEnum<typeof Colors> = 'RED'
  const test3: ValueOfEnum<typeof Colors> = Colors.Red

  // 👉 yup no ERROR 👌
  favoriteColor('unknown', 'RED')
  favoriteColor('unknown', Colors.Red)
  favoriteColor('unknown', Colors.Green)
}
