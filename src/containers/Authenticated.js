// @flow

import { connect } from 'react-redux'

import AuthenticatedRoute from '../components/AuthenticatedRoute'

const mapStateToProps = (state: Object, ownProps: Object) => ({
  isAuthenticated: state.session.isLoggedIn,
  Component: ownProps.component,
})

const Authenticated = connect(
  mapStateToProps,
)(AuthenticatedRoute)

export default Authenticated
