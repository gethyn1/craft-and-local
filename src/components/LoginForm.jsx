// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  isLoggedIn: boolean,
  loginUser: Function,
  referrerPath: ?string,
}

type State = {
  username: ?string,
  password: ?string,
}

class LoginForm extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state: State
  props: Props

  handleChange(event: Event & { target: HTMLInputElement }) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSubmit(event: Event) {
    event.preventDefault()

    this.props.loginUser(
      this.state.username,
      this.state.password,
    )
  }

  handleChange: Function
  handleSubmit: Function

  renderStatus() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    if (this.props.hasErrored) {
      return <p>There was an error</p>
    }

    return null
  }

  renderLoginStatus() {
    if (this.props.isLoggedIn) {
      return <p>You are logged in</p>
    }

    return <p>You are not logged in</p>
  }

  render() {
    const from = this.props.referrerPath || '/'

    // Redirect to referrer path if user is logged in
    if (this.props.isLoggedIn) {
      return <Redirect to={from} />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderLoginStatus()}
        {this.renderStatus()}
        <input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Username" />
        <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    )
  }
}

export default LoginForm
