// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'

import { NOT_FOUND_ROUTE } from '../../config'
import TextListInput from '../TextListInput'

type Props = {
  getProducer: Function,
  producerId: string,
  producer: Object,
  getCategories: Function,
  categories: Array<Object>,
  isLoading: boolean,
  hasErrored: boolean,
  onSubmit: Function,
  geoCodingLookup: Function,
  geoCodingOptions: ?Array<Object>,
  onGeoCodingSelect: Function,
  notFound: boolean,
}

type State = {
  title: ?string,
  user_id: ?string,
  description: ?string,
  categories: ?Array<string>,
  delivery: boolean,
  box_scheme: boolean,
  address: string,
  lng: number,
  lat: number,
  instagram_handle: ?string,
  twitter_handle: ?string,
  contact_email: ?string,
  contact_telephone: ?string,
  website: ?string,
}

class ProducerForm extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      address: '',
      title: '',
      user_id: '',
      description: '',
      categories: null,
      delivery: false,
      box_scheme: false,
      lng: 0,
      lat: 0,
      instagram_handle: '',
      twitter_handle: '',
      website: '',
      contact_email: '',
      contact_telephone: '',
      geoCodingOptions: null,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleGeoCoding = this.handleGeoCoding.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
    this.categoryInState = this.categoryInState.bind(this)
  }

  state: State

  componentDidMount() {
    this.props.getProducer(this.props.producerId)

    if (!this.props.categories) {
      this.props.getCategories()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.producer !== nextProps.producer) {
      this.mapProducerToState(nextProps.producer)
    }
  }

  mapProducerToState(producer: Object) {
    this.setState({
      title: producer.title,
      user_id: producer.user_id,
      description: producer.description || '',
      categories: producer.categories.map(category => category._id),
      lng: producer.location.coordinates[0] || 0,
      lat: producer.location.coordinates[1] || 0,
      instagram_handle: producer.instagram_handle || '',
      twitter_handle: producer.twitter_handle || '',
      website: producer.website || '',
      contact_email: producer.contact_email || '',
      contact_telephone: producer.contact_telephone || '',
    })
  }

  props: Props
  mapProducerToState: Function
  handleChange: Function
  handleCategoryChange: Function
  handleGeoCoding: Function
  handleSubmit: Function
  handleAddressSelect: Function
  categoryInState: Function

  handleChange(event: Event & { target: HTMLInputElement }) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value,
    })
  }

  handleCategoryChange(event: Event & { target: HTMLInputElement }) {
    const { categories } = this.state
    let newCategories = categories || []

    if (event.target.checked) {
      newCategories.push(event.target.value)
    } else if (categories) {
      newCategories = categories.filter(cat => cat !== event.target.value)
    }

    this.setState({
      categories: newCategories.length ? newCategories : null,
    })
  }

  handleGeoCoding(address: string) {
    this.props.geoCodingLookup(address)
  }

  handleAddressSelect(data: Object) {
    const lngLat = data.value.split(',')

    this.props.onGeoCodingSelect()

    this.setState({
      address: data.option,
      lng: parseFloat(lngLat[0]),
      lat: parseFloat(lngLat[1]),
    })
  }

  handleSubmit(event: Event) {
    event.preventDefault()

    this.props.onSubmit(this.state, this.props.producerId)
  }

  categoryInState(id: string) {
    if (this.state.categories) {
      return this.state.categories.includes(id)
    }

    return false
  }

  renderStatus: Function
  renderCategories: Function

  renderCategories() {
    const { categories } = this.props
    if (categories) {
      return categories.map((category: Object) => (
        <div key={category._id}>
          <input type="checkbox" checked={this.categoryInState(category._id)} onChange={this.handleCategoryChange} id={category._id} value={category._id} name="categories" />&nbsp;
          <label htmlFor={category._id}>{category.title}</label>
        </div>
      ))
    }

    return null
  }

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
    if (this.props.notFound) {
      return <Redirect to={`/${NOT_FOUND_ROUTE}`} />
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderStatus()}
          <div>
            <label htmlFor="title">Title</label><br />
            <input onChange={this.handleChange} type="text" name="title" value={this.state.title} />
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
            <label htmlFor="address_lookup">Address</label><br />
            <TextListInput
              options={this.props.geoCodingOptions}
              onChange={this.handleGeoCoding}
              onOptionSelect={this.handleAddressSelect}
              name="address_lookup"
            />
          </div>
          <div>
            <label htmlFor="lng">Longitude</label><br />
            <input onChange={this.handleChange} type="text" name="lng" value={this.state.lng} />
          </div>
          <div>
            <label htmlFor="lat">Latitude</label><br />
            <input onChange={this.handleChange} type="text" name="lat" value={this.state.lat} />
          </div>
          <div className="u-margin-bottom">
            <p>Categories:</p>
            {this.renderCategories()}
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
          <div>
            <label htmlFor="contact_email">Contact email address</label><br />
            <input onChange={this.handleChange} type="text" name="contact_email" value={this.state.contact_email} />
          </div>
          <div>
            <label htmlFor="contact_telephone">Contact telephone</label><br />
            <input onChange={this.handleChange} type="text" name="contact_telephone" value={this.state.contact_telephone} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default ProducerForm
