interface StringValidator {
  isAcceptable(s: string): boolean
}

const lettersRegexp = /^[A-Za-z]+$/
const numberRegexp = /^[0-9]+$/

class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s)
  }
}

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s)
  }
}

export const Validation = {
  LettersOnlyValidator,
  ZipCodeValidator,
}

// merge types with implementation namespace
export interface Validation {
  StringValidator: StringValidator
}
