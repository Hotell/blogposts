export type Omit<T, K> = Pick<T, Exclude<keyof T, keyof K>>
export type Constructor<T = {}> = new (...args: any[]) => T
