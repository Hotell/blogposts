// import React, { Component } from 'react'

// interface State {
//   value: number
//   tags: string[]
// }

// class Test extends React.Component<{}, State> {
//   state = {
//     value: 0,
//     tags: [],
//   } // state is now { value: number; tags: never[]; } instead of State
// }

// class TestViaCtor extends React.Component<{}, State> {
//   constructor(props: {}) {
//     super(props)

//     this.state = {
//       value: 0,
//       tags: [],
//     } // state is State, as generic definition is applied
//   }
// }

// class TestStateViaProp extends React.Component<{}, State> {
//   state = {
//     value: 0,
//     tags: [] as string[],
//   }
// }

// class TestStateViaProp extends React.Component<{}, State> {
//   state: State = {
//     value: 0,
//     tags: [],
//   }
// }
