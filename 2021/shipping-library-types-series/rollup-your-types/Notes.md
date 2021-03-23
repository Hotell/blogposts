# Notes

### [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts)

- rollup only
- works great
- bonus points for inlining all exports to one common export statement

```ts
// standard tsc output
export declare function divide(a: number, b: number): number

export declare function multiply(a: number, b: number): number

// ↓↓↓

// transformed  output - transformed to use single export (similar transformation like rollup does for js files)

declare function divide(a: number, b: number): number

declare function multiply(a: number, b: number): number

export { divide, multiply }
```

### [api-extractor](https://github.com/jeremyben/tsc-prog)

- works good!
- needs manual config to turn off tons of warning when TSDoc is not being used

### [tsc-prog](https://github.com/jeremyben/tsc-prog)

- works !

### [dts-bundle-generator](https://github.com/timocov/dts-bundle-generator)

- `dts-bundle-generator --external-types=react` doesn't work -> no `/// <reference types="react" />` is being included
