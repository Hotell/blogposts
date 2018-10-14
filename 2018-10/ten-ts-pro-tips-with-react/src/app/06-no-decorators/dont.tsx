import { Component } from 'react'
import { connect } from 'react-redux'

interface State {}
const mapStateToProps = (state: State) => ({})

@connect(mapStateToProps)
export class Container extends Component {}
