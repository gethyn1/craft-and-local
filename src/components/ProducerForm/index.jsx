// @flow

import React from 'react'

import ImageUpload from '../ImageUpload'
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
  uploadsIsLoading: Array<string>,
  uploadsHasErrored: Array<string>,
  uploadedImages: Array<Object>,
  onFileUpload: Function,
}

type State = {
  avatar: ?string,
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
  contact_email: ?string,
  contact_telephone: ?string,
  website: ?string,
}

class ProducerForm extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      avatar: undefined,
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
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleImageUploaded = this.handleImageUploaded.bind(this)
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
  handleFileChange: Function
  handleFileUpload: Function
  handleImageUploaded: Function

  handleChange(event: Event & { target: HTMLInputElement }) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value,
    })
  }

  handleFileChange(event: Event & { target: HTMLInputElement }) {
    event.preventDefault()

    const name = event.target.name
    const file = event.target.files[0]

    this.setState({
      [name]: { file },
    })
  }

  handleFileUpload(event: Event & { target: HTMLButtonElement }) {
    const name = event.target.getAttribute('data-name')
    if (name && this.state[name]) {
      this.props.onFileUpload(name, this.state[name].file)
    }
  }

  handleImageUploaded(name: string) {
    // eslint-disable-next-line no-console
    console.log(name, this.state[name])
    const imageObj = this.props.uploadedImages.find(image => image.id === name)
    // eslint-disable-next-line no-console
    console.log('image', imageObj)
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
      <div>
        <ImageUpload
          hasErrored={this.props.uploadsHasErrored.includes('avatar')}
          isLoading={this.props.uploadsIsLoading.includes('avatar')}
          hasUploaded={!!this.props.uploadedImages.find(item => item.id === 'avatar')}
          name="avatar"
          label="Avatar"
          onImageSelected={this.handleFileChange}
          onUploadImage={this.handleFileUpload}
          onImageUploaded={this.handleImageUploaded}
        />
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
