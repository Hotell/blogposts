# 10 TypeScript Pro tips with ( or without ) React

> 🎒 this article uses following library versions:

```json
{
  "@types/react": "16.x.x",
  "@types/react-dom": "16.x.x",
  "typescript": "3.x.x",
  "react": "16.5.2",
  "react-dom": "16.5.2"
}
```

> 🎮 [source code can be found on my github profile](https://github.com/Hotell/blogposts/tree/master/{date}/{title})

---

## 1. Don't use `public` accessor within classes

**Do:**

```tsx
class App extends Component {
  handleChange(){}
  render(){ render <div>Hello</div>}
}
```

**Don't:**

```tsx
class App extends Component {
  public handleChange(){}
  public render(){ render <div>Hello</div>}
}
```

**Why?**

## 2. Don't use `private` accessor within Component class

## 3. Don't use `protected` accessor within Component class

## 4. Don't use `enum`

## 5. Don't use `constructor` for class Components

## 6. Don't use decorators for class Components

## 7. Use type lookup for accessing component State or Props types

## 8. Always provide explicit type for `children` Props

## 9. Use type inference for defining Component State and defaultProps

## 10. When not using classes for models, export model type merged with implementation

---

As always, don't hesitate to ping me if you have any questions here or on Twitter (my handle [@martin_hotell](https://twitter.com/martin_hotell)) and besides that, happy type checking folks and 'till next time! Cheers! 🖖 🌊 🏄
