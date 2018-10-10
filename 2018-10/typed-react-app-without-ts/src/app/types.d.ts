export type ExtractFnArguments<T> = T extends (args: infer A) => any ? A : never
