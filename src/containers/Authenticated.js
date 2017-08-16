// @flow

import { connect } from 'react-redux'

import { sessionLoginSetReferrerPath } from '../actions/session'

import AuthenticatedRoute from '../components/AuthenticatedRoute'

const mapStateToProps = (state: Object, ownProps: Object) => ({
  isAuthenticated: state.session.isLoggedIn,
  Component: ownProps.component,
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
