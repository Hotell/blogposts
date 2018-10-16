export type EnumLiteralOf<T extends object> = T[keyof T]
export type UnionFromTuple<T> = T extends (infer U)[] ? U : never
