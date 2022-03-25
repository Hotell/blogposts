# {Title}

> 📅 Article Last update: dd.mm.yyyy

> 🎒 Library versions used in this article:

```json
{
  "typescript": "4.6.2",
  "@microsoft/api-extractor": "7.19.5",
  "downlevel-dts": "0.9.0"
}
```

> 🎮 [source code can be found on my github profile](https://github.com/Hotell/blogposts/tree/master/2021/shipping-library-types-series/downtranspile-your-types)

---

## {Subtitle}

### Outline

- show the problem: you run into this error right (show a library that ships with types that support only higher TS version than your app)
- 🛠 introduce demo code for our library
- 🛠 implement downleveling step by step

  - define approaches / every .d.ts or rolluped .d.ts -> we'll use rolluped
  - pre-requisite: rollup dts
  - 🛠 describe the tool/approach https://github.dev/sandersn/downlevel-dts

- demo our library with downlevel types with 2 diff versions of TS - all works !
- ✅ provide table overview of all features and their downlevel readiness
- extra: integration check that your types are not introducing new functionality thus need downlevel
- summary
  - highlight that downleveling:
    - brings radically worse DX, thus user should be encouraged to use latest TS whenever possible
    - helps to use mitigate being blocked to leverage latest TS features without fear of breaking customers code

### Hey Cortana, bing Downleveling

#### Why downleveling

#### What is downleveling

#### How can we downlevel `.d.ts`

For downleveling declaration types we use awesome [downlevel-dts](https://github.com/sandersn/downlevel-dts) library.

**How `downlevel-dts` works in nutshell:**

It takes syntactic replacement approach, so more advanced capabilities like using checker to acquire inferred types **is not possible by design** .

**Example:**

For example we cannot instantiate Template literal types to be able to print all dynamic variations to downleveled types:

```ts
declare type World = 'world'
declare type Greeting = `hello ${World}`
```

↓↓↓ `downlevel-dts` ↓↓↓

```ts
declare type World = 'world'

// this is not possible unfortunately
declare type Greeting = `hello world`
```

### TypeScript lang feature additions tables

#### pre TS 3.4 era overview with most important language additions

> those features are beyond downlevelig capabilities

| TS version | feature                  | documentation                                                                                                                             |
| ---------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 2.8        | Conditional types        | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#conditional-types)                                  |
| 3.0        | Optional tuple types     | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#optional-elements-in-tuple-types)                   |
| 3.0        | Generic rest parameters  | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#generic-rest-parameters)                            |
| 3.0        | `unknown` type           | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)                               |
| 3.1        | typesVersions            | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html#version-selection-with-typesversions)               |
| 3.4        | `const` assertions       | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)                                   |
| 3.4        | `readonly` arrays/tuples | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#improvements-for-readonlyarray-and-readonly-tuples) |

#### Overview with language additions that are subject to downleveling

| TS version | feature                                             | documentation                                                                                                                                | donwlevel-dts | can be implemented | remarks                                                                                                                                                                                                                             |
| ---------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.5        | `Omit` helper                                       | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#the-omit-helper-type)                                  | ✅            | ✅                 |                                                                                                                                                                                                                                     |
| 3.6        | Class Accessors                                     | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-6.html#get-and-set-accessors-are-allowed-in-ambient-contexts) | ✅            | ✅                 |                                                                                                                                                                                                                                     |
| 3.7        | `asserts` assertion guards                          | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)                                   | ✅            | ✅                 |                                                                                                                                                                                                                                     |
| 3.8        | Type-only import/export                             | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)                          | ✅            | ✅                 |                                                                                                                                                                                                                                     |
| 3.8        | ECMA class private fields                           | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#ecmascript-private-fields)                             | ✅            | ✅                 |                                                                                                                                                                                                                                     |
| 3.8        | ECMA `export * as namespace`                        | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#export--as-ns-syntax)                                  | ✅            | ✅                 |                                                                                                                                                                                                                                     |
| 4.0        | Labeled tuples                                      | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#labeled-tuple-elements)                                | ✅            | ✅                 |                                                                                                                                                                                                                                     |
| 4.0        | Variadic tuple types                                | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)                                  | ❌            | ❌                 |                                                                                                                                                                                                                                     |
| 4.1        | Template literal types                              | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)                                | ❌            | ✅                 | static replacement to `string` only                                                                                                                                                                                                 |
| 4.1        | Key Remmaping in Mapped Types                       | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)                         | ❌            | ⚠️                 | remove `as` which defeats the functionality in first place                                                                                                                                                                          |
| 4.1        | Recursive Conditional Types                         | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)                           | ❌            | ⚠️                 | if you need this 4.1 needs to be your last supported version                                                                                                                                                                        |
| 4.2        | `abstract` construct signatures                     | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-2.html#abstract-construct-signatures)                         | ❌            | ❌                 |                                                                                                                                                                                                                                     |
| 4.2        | Leading/Middle Rest Elements in Tuple Types         | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-2.html#leadingmiddle-rest-elements-in-tuple-types)            | ❌            | ❌                 |                                                                                                                                                                                                                                     |
| 4.3        | `static` index signatures                           | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#static-index-signatures)                               | ❌            | ❌                 |                                                                                                                                                                                                                                     |
| 4.3        | ECMA `#private` Class Elements                      | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#ecmascript-private-class-elements)                     | ✅            | ✅                 |                                                                                                                                                                                                                                     |
| 4.3        | Separate Write Types on Properties                  | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#separate-write-types-on-properties)                    | ❌            | ❌                 |                                                                                                                                                                                                                                     |
| 4.4        | Symbol and Template String Pattern Index Signatures | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html#symbol-and-template-string-pattern-index-signatures)   | ❌            | ✅                 | static replacement to `string` only                                                                                                                                                                                                 |
| 4.5        | `type` Modifiers on Import Names                    | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#type-modifiers-on-import-names)                        | ✅            | ✅                 |                                                                                                                                                                                                                                     |
| 4.5        | `Awaited` helper                                    | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements)             | ❌            | ⚠️                 | Needs recursive conditional types, thus can be downtranspiled only to 4.1. <br/><br/> **Approach:** _TS>=4.1_ inject manually written `Awaited` (same how `Omit` downlevel works). _TS<4.1_ Needs recursive conditional types below |
| 4.5        | Template String Types as Discriminant               | [link](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#template-string-types-as-discriminants)                | ❌            | ❌                 | Can be down-transpiled to `string` which will work for types, but for consumer it will make usage of discriminant union impossible                                                                                                  |

---

As always, don't hesitate to ping me if you have any questions here or on Twitter (my handle [@martin_hotell](https://twitter.com/martin_hotell)) and besides that, happy type checking folks and 'till next time! Cheers! 🖖 🌊 🏄
