// @flow

import React from 'react'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  onSubmit: Function,
}

type State = {
  title: ?string,
  user_id: ?string,
  description: ?string,
  categories: Array<string>,
  delivery: boolean,
  box_scheme: boolean,
  lng: number,
  lat: number,
  instagram_handle: ?string,
  twitter_handle: ?string,
  website: ?string,
}

class ProducerForm extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      user_id: '',
      description: '',
      categories: [],
      delivery: false,
      box_scheme: false,
      lng: 0,
      lat: 0,
      instagram_handle: '',
      twitter_handle: '',
      website: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderStatus = this.renderStatus.bind(this)
  }

  state: State
  props: Props
  handleChange: Function
  handleSubmit: Function

  handleChange(event: Event & { target: HTMLInputElement }) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSubmit(event: Event) {
    event.preventDefault()

    this.props.onSubmit(this.state)
  }

  renderStatus: Function

  renderStatus() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    if (this.props.hasErrored) {
      return <p>There was an error saving the producer</p>
    }

    return null
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderStatus()}
        <div>
          <label htmlFor="title">Title</label><br />
          <input onChange={this.handleChange} type="text" name="title" value={this.state.title} />
          <p>Title is required</p>
        </div>
        <div>
          <label htmlFor="user_id">User ID</label><br />
          <input onChange={this.handleChange} type="text" name="user_id" value={this.state.user_id} />
        </div>
        <div>
          <label htmlFor="description">Description</label><br />
          <textarea onChange={this.handleChange} name="description" value={this.state.description} />
        </div>
        <div>
          <label htmlFor="lng">Longitude</label><br />
          <input onChange={this.handleChange} type="text" name="lng" value={this.state.lng} />
        </div>
        <div>
          <label htmlFor="lat">Latitude</label><br />
          <input onChange={this.handleChange} type="text" name="lat" value={this.state.lat} />
        </div>
        <div>
          <p>Categories:</p>
        </div>
        <div>
          <label htmlFor="instagram_handle">Instagram</label><br />
          <input onChange={this.handleChange} type="text" name="instagram_handle" value={this.state.instagram_handle} />
        </div>
        <div>
          <label htmlFor="twitter_handle">Twitter</label><br />
          <input onChange={this.handleChange} type="text" name="twitter_handle" value={this.state.twitter_handle} />
        </div>
        <div>
          <label htmlFor="website">Website</label><br />
          <input onChange={this.handleChange} type="text" name="website" value={this.state.website} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default ProducerForm
