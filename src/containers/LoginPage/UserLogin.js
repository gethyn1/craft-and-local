// @flow

import { connect } from 'react-redux'

import {
  sessionPostLoginCredentials,
} from '../session/actions'

import LoginForm from '../../components/LoginForm'

const mapStateToProps = (state: Object) => ({
  isLoading: state.session.isLoading,
  hasErrored: state.session.hasErrored,
  isLoggedIn: state.session.isLoggedIn,
  referrerPath: state.session.authReferrerPath,
})

const mapDispatchToProps = (dispatch: Function) => ({
  loginUser: (username: string, password: string) => {
    dispatch(sessionPostLoginCredentials(username, password))
  },
})

const UserLogin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm)

export default UserLogin
