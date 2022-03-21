# {Title}

> 📅 Article Last update: dd.mm.yyyy

> 🎒 Library versions used in this article:

```json
{
  "@types/react": "17.x.x",
  "@types/react-dom": "17.x.x",
  "typescript": "4.x.x",
  "react": "17.0.2",
  "react-dom": "17.0.2"
}
```

> 🎮 [source code can be found on my github profile](https://github.com/Hotell/blogposts/tree/master/2021/shipping-library-types-series/downtranspile-your-types)

---

## {Subtitle}

### Outline

- show the problem: you run into this error right (show a library that ships with types that support only higher TS version than your app)
- introduce demo code for our library
- implement downleveling step by step

  - define approaches / every .d.ts or rolluped .d.ts -> we'll use rolluped
  - pre-requisite: rollup dts
  - describe the tool/approach https://github.dev/sandersn/downlevel-dts

- demo our library with downlevel types with 2 diff versions of TS - all works !
- provide table overview of all features and their downlevel readiness
- extra: integration check that your types are not introducing new functionality thus need downlevel
- summary
  - highlight that downleveling:
    - brings radically worse DX, thus user should be encouraged to use latest TS whenever possible
    - helps to use mitigate being blocked to leverage latest TS features without fear of breaking customers code

---

As always, don't hesitate to ping me if you have any questions here or on Twitter (my handle [@martin_hotell](https://twitter.com/martin_hotell)) and besides that, happy type checking folks and 'till next time! Cheers! 🖖 🌊 🏄
