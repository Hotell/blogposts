# Improved redux type safetey with typescript 2.8

Some time ago I wrote about how to effectively leverage Typescript to write type safe action creators and reducers. Make sure to read it before continuing ->[Redux & Typescript typed Actions with less keystrokes](https://medium.com/@martin_hotell/redux-typescript-typed-actions-with-less-keystrokes-d984063901d)

At that time ( pre TS 2.8 era ) there wasn't a clean solution how to get the return type of an function without some hacks.

With latest additions to Typescript 2.8, this is now possible! Let's see how, shall we ?

## Predefined conditional types within standard library (lib.d.ts)

Typescript 2.8 supports conditional types, which is a huge addition to the type checker! ( kudos to Mr. Anders Hejlsberg ).

> I won't get into details about them in this post as it deserves post on it's own. ( you can read more [here](https://github.com/Microsoft/TypeScript/pull/????) )

Thanks to this, we can create new powerfull mapped types, let's say, for getting return type of a function, which we desperately need for our action creators.

> What are mapped types? Read more [here](????)

Wait a second, they are already a part of TS 2.8 yay! We've got following new mapped types at our disposal:

* `Exclude<T, U>` -- Exclude from T those types that are assignable to U.
* `Extract<T, U>` -- Extract from T those types that are assignable to U.
* `NonNullable<T>` -- Exclude null and undefined from T.
* `ReturnType<T>` -- Obtain the return type of a function type.
* `InstanceType<T>` -- Obtain the instance type of a constructor function type.

> for more info (check out this PR)[https://github.com/Microsoft/TypeScript/pull/21847]

We will focus only on `ReturnType<T>` mapped type, which will get us return type of an action creator(a javascript function) which we have been all looking for! Let's see how.

## ReturnType<T>

Let's define our action type and action creator for setting a user age

```ts
const SET_AGE = '[user] SET_AGE'

const setAge = (age: number) => ({ type: SET_AGE, payload: age })
```

Now we need to get somehow the return type of our FSA creator.

> **Why we need the return type of action creator?**
>
> We wanna leverage discriminant unions for 100% type safe reducers and for handling side effects via epics ( redux-observable) or effects (@ngrx/store)

So as I've already mentioned bilion times until now ( sorry :D ), we can leverage new mapped type -> `ReturnType<T>`:

```ts
type SetAgeAction = ReturnType<typeof setAge>
```

> **Why `typeof setAge` ?**
>
> We need to provide a type as a generic parameter to our mapped type. real implementation is not a type, but Typescript got us covered to get types from implementation via `typeof` operator

That's it! Is it!?

...well when we look at the inferred implementation of `SetAgeAction`, we will see following type definition

```ts
{
  type: string
  payload: number
}
```

Oh no, where did our const type literal go? Typescript flattened it to a string literal base type, which is `string`. We need to be explicit within our action creator, to make the proper type annotation flow correctly.

Fix is easy enough - we need to explicitly cast it to our `SET_AGE` literal type:

```ts
const setAge = (age: number) => ({ type: SET_AGE as typeof SET_AGE, payload: age })
```

Now our inferred type is correct

```ts
{
  type: '[user] SET_AGE'
  payload: number
}
```

**PROS:**

* aciton type is inferred from implementation and because of that stays in sync!

**CONS:**

* explicitly castint `type`

## Reducing the action boilerplate

I don't now about you but I don't like to cast `type` explicitly within every action creator.

Let's write a super tiny utility function for creating our FSA action object:

```ts
interface Action<T extends string> {
  type: T
}
interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

function createAction<T extends string>(type: T): Action<T>
function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>
function createAction(type: string, payload?: any) {
  return payload ? { type, payload } : { type }
}
```

> We are using typescript function overloading so we get proper types by argument arity

Now we can define our action creator like this:

```ts
const setAge = (age: number) => createAction(SET_AGE, age)
```

And our inferred action type remains the same

```ts
type SetAgeAction = ReturnType<typeof setAge>

// type
{
  type: '[user] SET_AGE'
  payload: number
}
```

**PROS:**

* ( as before ) action type is inferred from implementation and because of that stays in sync!
* we don't have to cast our type
* more concise than before

**CONS:**

* none I guess ? :)

## Reducing the action boilerplate further

We can push it even further by creating custom `action` helper like this:

```ts
type ActionFn<T extends string> = () => Action<T>
type ActionWithPayloadFn<T extends string, P> = (payload: P) => ActionWithPayload<T, P>

function action<T extends string>(type: T): ActionFn<T>
function action<T extends string, P>(type: T): ActionWithPayloadFn<T, P>
function action(type: string) {
  return (payload?: any) => (payload ? { type, payload } : { type })
}
```

> again we are using function overloads to get proper action types

Which we can use like this:

```ts
const setAge = action<typeof SET_AGE, number>(SET_AGE)
```

with getting our inferred action type as before

```ts
type SetAgeAction = ReturnType<typeof setAge>

// type
{
  type: '[user] SET_AGE'
  payload: number
}
```

or if our action doesn't conatain any payload, Typescript can properly infer the type generic literal from it's source

```ts
const DO_SOMETHING_MUNDANE = '[misc] do something'

const doSomethingMundane = action(DO_SOMETHING_MUNDANE)

type DoSomethingAction = ReturnType<typeof doSomethingMundane>
```

with that our `DoSomethingAction` will have following type:

```ts
{
  type: '[misc] do something'
}
```

**PROS:**

* ( as before ) action type is inferred from implementation and because of that stays in sync!
* ( as before ) we don't have to cast our type
* even more concise than `createAction`

**CONS:**

* if we wanna provide payload, we have to explicitly declare `typeof SET_AGE` as type generic, because TS isn't able to do that for us

## Reducing the action boilerplate by using classes

As I've mentioned in my previous article, you can create action creators via classes, which is IMHO, even prior to `ReturnType<T>` TS addition, the most concise way to create actions.

It looks like this:

```ts
class SetAgeAction {
  readonly type = SET_AGE
  constructor(public payload: number) {}
}
```

Everything is defined once -> implementaion and action type definition. Ellegant don't you think ?!

> only "downside" is that redux will not allow you this approach as actions need to be POJOs, with no prototype chain
>
> This can be mitigated via custom middleware, which sprads the created instance to become pure Object
>
> ```ts
> export const actionToPlainObject: MiddlewareFn<{}, Action> = store => next => action =>
>   next({ ...action })
> ```
>
> If you're using @ngrx/store you don't need to do this because it allows any objects types

**PROS:**

* implementation is also type definition because structural origin of Typescript
* concise and ellegant
* constructor parameter named generically `payload`, which may not be very desriptive if payload is primitive type

**CONS:**

* (if you're using redux ) you need to provide custom middleware for flattening custom class instance to pure object
* using `new Action()` ( may feel strange or just wrong to some functional purists, I don't mind personaly 😎 )

## Summary

Typescript 2.8 comes with very important new features:

* powerfull conditional types
* new default conditional mapped types, from which we can leverage `ReturnType<T>` to get return types of a function

Thanks to these new features, Typescript is able to inferr action type of our action creator implementation,
so we don't have to duplicate our work and keep type definition and implementaion in sync.

**Instead of telling the program what types it should use, types are inferred from the imlpementation, so type checker gets out of our way!**

Let's see comparison examples side by side

**Before Typescript 2.8:**

```ts
// you need to define the shape first
type SetAgeAction = { type: typeof SET_AGE; payload: number }

// then implement the shape
const setAge = (age: number): SetAgeAction => ({ type: SET_AGE, payload: age })
```

**Since Typescript 2.8:**

```ts
// just implement you action creator
const setAge = (age: number) => ({ type: SET_AGE as typeof SET_AGE, payload: age })

// get it's shape from implementaion, which stays in sync!
type SetAgeAction = ReturnType<typeof setAge>
```

### Comparison with using classes vs functions for type safe action creators

**function**

```ts
const SET_AGE = '[user] SET_AGE'

const setAge = (age: number) => ({ type: SET_AGE as typeof SET_AGE, payload: age })

type SetAgeAction = ReturnType<typeof setAge>
```

**class**

```ts
const SET_AGE = '[user] SET_AGE'

class SetAgeAction {
  readonly type = SET_AGE
  constructor(public payload: number) {}
}
```

That's it. Thanks for reading and happy type checking! Till next time folks! Cheers ;)
