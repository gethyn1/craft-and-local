// @flow

import { connect } from 'react-redux'

import { sessionLogout } from './actions'

import Logout from '../../components/Logout'

const mapStateToProps = (state: Object) => ({
  isLoggedIn: state.session.isLoggedIn,
})

const mapDispatchToProps = (dispatch: Function) => ({
  handleLogout: () => {
    dispatch(sessionLogout())
  },
})

const UserLogout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout)

export default UserLogout
