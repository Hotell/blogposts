import { EnumLiteralOf, UnionFromTuple } from './types'

const Enum = <T extends string[]>(...args: T) => {
  return Object.freeze(args.reduce((acc, next) => {
    return {
      ...acc,
      [next]: next,
    }
  }, Object.create(null)) as { [P in UnionFromTuple<typeof args>]: P })
}

export type Response = keyof typeof Response
// $ExpectType  Readonly<{ YES: "YES"; NO: "NO"; }>
const Response = Enum('YES', 'NO')

export type Colors = EnumLiteralOf<typeof Colors>
// $ExpectType  Readonly<{ RED: "RED"; GREEN: "GREEN"; BLUE: "BLUE"; }>
const Colors = Enum('RED', 'GREEN', 'BLUE')
