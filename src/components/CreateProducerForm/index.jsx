// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'

import Error from '../Error'
import Loading from '../Loading'

type Props = {
  hasCreatedProducer: boolean,
  hasErrored: boolean,
  isLoading: boolean,
  onSubmit: Function,
}

type State = {
  title: ?string,
  user_id: ?string,
}

class CreateProducerForm extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      user_id: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  state: State
  onSubmit: Function
  handleSubmit: Function

  handleSubmit(event: Event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  props: Props
  handleChange: Function

  handleChange(event: Event & { target: HTMLInputElement }) {
    const name = event.target.name

    this.setState({
      [name]: event.target.value,
    })
  }

  renderStatus() {
    if (this.props.hasErrored) {
      return <Error><p>There was an error creating the producer</p></Error>
    }

    if (this.props.isLoading) {
      return <Loading><p>Creating producer ...</p></Loading>
    }

    return null
  }

  render() {
    if (this.props.hasCreatedProducer && this.state.user_id) {
      return <Redirect to={`/producer/edit/${this.state.user_id}`} />
    }

    return (
      <div>
        {this.renderStatus()}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title</label><br />
            <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
          </div>
          <div>
            <label htmlFor="user_id">User ID</label><br />
            <input type="text" name="user_id" onChange={this.handleChange} value={this.state.user_id} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateProducerForm
