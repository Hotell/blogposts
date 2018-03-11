declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

declare type Constructor<T = {}> = new (...args: any[]) => T
