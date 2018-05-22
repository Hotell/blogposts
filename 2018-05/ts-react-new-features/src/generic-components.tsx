import React, { Component } from 'react'

type UserProps<T> = {
  name: string
  email: string
  skills: JsSkills<T>
}
class User<T> extends Component<UserProps<T>> {
  render() {
    const { name, email, skills } = this.props
    return (
      <>
        Hello {name} ! Thanks for giving us your email <b>{email}</b>
      </>
    )
  }
}

interface JsSkills<T=void> {
    implement(): T
    test(): T
    refactor(): T
}

const App = () => {
  return (
    <>
      <User <boolean> 
        name="Martin" 
        email="foo@bar.com" 
        skills={{
          implement(){ return true },
          refactor(){ return true },
          test(){ return false }
        }}
      />
    </>
  )
}
