import { Validation } from './idiomatic-namespace'

// Some samples to try
let strings = ['Hello', '98052', '101']

// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {}
validators['ZIP code'] = new Validation.ZipCodeValidator()
validators['Letters only'] = new Validation.LettersOnlyValidator()

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? 'matches' : 'does not match'
      } ${name}`
    )
  }
}
