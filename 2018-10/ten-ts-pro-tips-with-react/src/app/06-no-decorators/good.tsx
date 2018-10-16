import { Component } from 'react'
import { connect } from 'react-redux'

interface State {}
const mapStateToProps = (state: State) => ({})

const enhance = connect(mapStateToProps)
class Container extends Component {}

const EnhancedComponent = enhance(Container)
export { EnhancedComponent as Container }
