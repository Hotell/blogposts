export {}

type ErrorCodes = 404 | 403
const ErrorCodes = Object.freeze({
  NotFound: 404 as 404,
  Forbidden: 403 as 403,
})

const ActionTypes = Object.freeze({
  Get: '[Crud operation] GET',
  Post: '[Crud operation] POST',
  Delete: '[Crud operation] DELETE',
})

// TESTS
