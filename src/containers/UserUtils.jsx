// @flow

import { connect } from 'react-redux'

import TopBar from '../components/TopBar'

const mapStateToProps = (state: Object) => ({
  isLoggedIn: state.session.isLoggedIn,
  isAdmin: state.session.isAdmin,
  user: state.session.userEmail,
})

const UserUtils = connect(
  mapStateToProps,
)(TopBar)

export default UserUtils
