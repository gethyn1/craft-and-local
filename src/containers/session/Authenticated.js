// @flow

import { connect } from 'react-redux'

import { sessionLoginSetReferrerPath } from './actions'

import AuthenticatedRoute from './AuthenticatedRoute'

const mapStateToProps = (state: Object, ownProps: Object) => ({
  isAuthenticated: state.session.isLoggedIn,
  isAdmin: state.session.isAdmin,
  Component: ownProps.component,
  isAdminComponent: ownProps.adminComponent,
})

const mapDispatchToProps = (dispatch: Function) => ({
  setReferrerPath: (path: string) => {
    dispatch(sessionLoginSetReferrerPath(path))
  },
})

const Authenticated = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedRoute)

export default Authenticated
