// $ExpectError
interface State extends typeof initialState {}

const initialState = {
  counter: 0,
}
