# Use React Tools for better Angular Apps

> How to leverage the best from React ecosystem and beyond to make our daily task easier and more effective within Angular apps and in the end become the best friends ever !

After seeing that cover image of this article, your first impression must be like: OMG! another clickbait article about why X sucks and Y is the silver bullet. Well, I have to disappoint you. This article is about the complete opposite :)

---

Instead of wasting our time by participating on twitter rants and so on, we will leverage the best that other ecosystems ( React ) have to offer and thanks to that we will get better/faster/stronger tools for our achieving our daily development tasks with Angular.

Question is where to start? or How to achieve that goal, or even why should I bother with other ecosystems and tools. Great questions indeed! Let's get some answers, shall we?

## Why

Angular Framework is a great piece of technolgy on it's own indeed, so why should you look somewhere else?

Well, there is a very tiny(or huge) problem. Everything Angular is **tightly coupled to Angular and its ecosystem**, and I don't know how about you, but **I really hate to have boundaries for achieving my goals**.

Angular framework is also kinda "huge beast" (kudos to Angular team and OSS contributors for their efforts, thank you folks! ), but it's just unreal to cover all the corners of day to day development with a top notch solution.

By looking outside Angular "ecosystem isolation", we can learn a lot from others and leverage that for our own benefit and better Angular apps with excellent DX along it's way, which in the end saves money and time for our employers and clients.

## How

To answer the question "How to leverage other ecosystems" we need to to introduce and take a look at 3 categories that are an integral part of software development:

* Tools
* Architecture
* Libraries

As a baseline we will use "Industry standard" for booting up new Angular apps - **Angular CLI**
![Angular CLI](https://user-images.githubusercontent.com/1560278/27637944-cfa5df36-5c11-11e7-8cb7-85be0017faf1.gif)

We can boot new Angular app in matter of seconds, with all "recommended/required tooling and setup", by executing simple command:

```sh
npx @angular/cli new my-app
```

> **NOTE:** never user a `-g` flag when installing packages! Global things are bad for your machine/life and thanks to **npx** you don't need them anyway :)

Let’s take a look what CLI gives us by default from perspective of our 3 defined categories:

* Libraries - all @angular/\* packages and RxJs

* Architecture - Component driven architecture with Service layer, but no restrictions on this front ( use what you want )

* Tools:

  * we’ve got webpack as a module bundler
  * Protractor/Selenium for e2e testing
  * Jasmine with Karma for unit testing
  * and last but not least, the best thing that ever happened to JavaScript - Typescript with solid static analysis extensions for adhering to proper styleguides and - TSLint and Codelyzer

So far so good right ?!

## Tools

Tooling is indeed crucial for our productivity. Let's see what can be done on this front.

Let's start with package manager...

### Package Manager/Task Runner

Most of you are probably using npm, which was super annoying to use and slow untill version 5. While npm is constantly improving, you don't have to wait and instead you can switch to a better tool -> [yarn](https://yarnpkg.com/en/)

I'm not going to enumerate all the benefits, just a few time savers that you can leverage on daily basis.

How would you execute locally installed TypeScript from CLI with npm, or execute custom npm-script or pass additional arguments to your custom npm-script ? You're smart and sure know how to do those, but with yarn it's much easier. Comparison is on following image:
![Yarn vs Npm task runner](./img/yarn-vs-npm.png 'Yarn vs Npm task runner')

How are you bumping you dependencies ? By hand ? Seriously ? We can do better with yarn:

![Upgrading deps via yarn cli](./img/yarn-1.gif 'Upgrading deps via yarn cli')

> Just to not be biased against npm, you can achieve the same via 3rd party package(npm-update) and npx via `npx npm-update -u` just sayin...

### Formatting

CLI comes with pre-configured TSLint supported by Codelyzer, which helps us lint our code and adhere to strictly set style guides within our project. TSLint takes also care of consistent spaces at various places ( functions, module imports, etc... ), empty lines, single/double quotes, semicolons/no-semicolons... But if you think that this is the right way to do formating, you are fundamentaly wrong. Anyway Lint is for Linting not for formatting !

So how to use consistent formatting within our codebase isntead of linter(TSlint) ?

Please welcome [Prettier](https://prettier.io/)

![Prettier](https://avatars1.githubusercontent.com/u/25822731?s=280&v=4)

**Prettier**

is an opinionated formatter created by Facebook and OSS community. You can read more about it on prettier website.

We can add it to our CLI very easily:

Install

```sh
yarn add -D prettier
```

and define a new npm script:

```json
{
  "scripts": {
    "format": "prettier {src/e2e}/**/* --write"
  }
}
```

By executing `yarn format` our whole codebase is formatted in matter of seconds and it's super fast!

That's it? Not entirely! Because TSlint contains formatting rules, which has nothing to do with linting, we need to turn off these rules... Uff looks like lot of manual work ! Thanks to OSS we can leverage [tslint-config-prettier](https://github.com/alexjoverm/tslint-config-prettier) package, which handles everything for us!

Install:

```sh
yarn add -D tslint-config-prettier
```

and extend `tslint.json` rules with it:

```json
{
  "extends": [
    "tslint-config-prettier"
  ],
  "rulesDirectory": [
    "node_modules/codelyzer"
  ],
  "rules": {...}
}
```

There are still issues though. CLI defines lot's of rules within `tslint.json` which are overriding anything that extends our config. Again, **tslint-config-prettier** comes with a handy CLI tool, that detects those rules in conflict, which need to be removed:

By Executing local binary

```sh
yarn tslint-config-prettier-check ./tslint.json
```

We will get output like this:
![tslint rules in conflict with prettier](./img/tslint-prettier-conflicts.png)

I see a great PR opportunity here to automate the removal of those conflicting lint rules ;)

Formatting/Linting Done! Although there is a room for improvement. I don't know how about you? but I'm lazy and don't want to execute formatting/linting everytime.

#### Hey Robot! Do your work!

We can handle robots to do that for us. This can be achieved thanks to git-hooks and 2 node libraries:

* [lint-staged](https://github.com/okonet/lint-staged) 🚫💩 — Run linters/formatters on git staged files
* [husky](https://github.com/typicode/husky) 🐶 Git hooks made easy

Install those:

```sh
yarn add -D lint-staged husky
```

Configure lint-staged:

```json
{
  "lint-staged": {
    "{src,e2e}/**/*.{js,jsx,ts,tsx}": ["yarn lint", "git add"],
    "{src,e2e}/**/*.{js,jsx,ts,tsx,css,scss,md}": ["prettier --write", "git add"]
  }
}
```

![lint-staged config in package.json](./img/lint-staged-config.png)

And add commit hook via custom npm script, which will be recognised by `husky` and executed on particular git-hook. In our case we want to hook into pre-commit git life cycle and execute lint-staged binary with our configuration:

```json
{
  "scripts": {
    "precommit": "lint-staged"
  }
}
```

Now everytime we will commit to the repo, our staged files will be formatted and linting violations fixed by TSLint, if they are autofixable, otherwise our commit will fail ! Excellent, you will never ever argue with your PR reviewer about semicolons vs no-semicolons 👌.

With that said, let's switch to more serious stuff.

### Unit Testing

### E2E Testing

## Architecture

## Libraries

---

## Summary
