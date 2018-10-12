export {}

type ErrorCodes = 404 | 403
const ErrorCodes = {
  NotFound: 404,
  Forbidden: 403,
}

const ActionTypes = {
  Get: '[Crud operation] GET',
  Post: '[Crud operation] POST',
  Delete: '[Crud operation] DELETE',
}

// TESTS:
