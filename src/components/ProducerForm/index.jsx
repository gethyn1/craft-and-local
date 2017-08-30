// @flow

import React from 'react'

import TextListInput from '../TextListInput'

type Props = {
  getCategories: Function,
  categories: Array<Object>,
  isLoading: boolean,
  hasErrored: boolean,
  onSubmit: Function,
  geoCodingLookup: Function,
  geoCodingOptions: ?Array<Object>,
  onGeoCodingSelect: Function,
}

type State = {
  title: ?string,
  user_id: ?string,
  description: ?string,
  categories: ?Array<string>,
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
      categories: null,
      delivery: false,
      box_scheme: false,
      lng: 0,
      lat: 0,
      instagram_handle: '',
      twitter_handle: '',
      website: '',
      geoCodingOptions: null,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleGeoCoding = this.handleGeoCoding.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
  }

  state: State

  componentDidMount() {
    if (!this.props.categories) {
      this.props.getCategories()
    }
  }

  props: Props
  handleChange: Function
  handleCategoryChange: Function
  handleGeoCoding: Function
  handleSubmit: Function
  handleAddressSelect: Function

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

  handleAddressSelect(value: string) {
    const lngLat = value.split(',')

    this.props.onGeoCodingSelect()

    this.setState({
      lng: parseFloat(lngLat[0]),
      lat: parseFloat(lngLat[1]),
    })
  }

  handleSubmit(event: Event) {
    event.preventDefault()

    this.props.onSubmit(this.state)
  }

  renderStatus: Function
  renderCategories: Function

  renderCategories() {
    const { categories } = this.props
    if (categories) {
      return categories.map((category: Object) => (
        <div key={category._id}>
          <input type="checkbox" onChange={this.handleCategoryChange} id={category._id} value={category._id} name="categories" />&nbsp;
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
    return (
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
          <label htmlFor="address_lookup">Postcode</label><br />
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
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default ProducerForm
