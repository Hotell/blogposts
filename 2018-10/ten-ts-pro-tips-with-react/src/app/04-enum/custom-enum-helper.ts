function tuple<TS extends string[]>(...xs: TS) {
  return xs
}

export type UnionFromTuple<T> = T extends (infer U)[] ? U : never

const Enum = <T extends string[]>(...args: T) => {
  return Object.freeze(args.reduce((acc, next) => {
    return {
      ...acc,
      [next]: next,
    }
  }, Object.create(null)) as { [P in UnionFromTuple<typeof args>]: P })
}

// $ExpectType  Readonly<{ YES: "YES"; NO: "NO"; }>
const Response = Enum('YES', 'NO')
// $ExpectType  Readonly<{ RED: "RED"; GREEN: "GREEN"; BLUE: "BLUE"; }>
const Colors = Enum('RED', 'GREEN', 'BLUE')
