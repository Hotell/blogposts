import { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { compose } from 'redux'

interface State {}
const mapStateToProps = (state: State) => ({})

const enhance = compose(
  translate(),
  connect(mapStateToProps)
)
class Container extends Component {}

const EnhancedComponent = enhance(Container)
export { EnhancedComponent as Container }
