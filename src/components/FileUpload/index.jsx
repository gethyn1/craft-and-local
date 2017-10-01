// @flow

import React from 'react'

import Error from '../Error'
import Loading from '../Loading'

type Props = {
  hasErrored: boolean,
  isLoading: boolean,
  hasUploaded: boolean,
  label: ?string,
  name: string,
  onUploadFile: Function,
  uploadKeys: Object,
}

type State = {
  file: ?Object,
}

// TO DO: Upload multiple files

class FileUpload extends React.Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  state: State

  componentDidMount() {
    this.state = {
      file: null,
    }
  }

  props: Props

  handleChange(event: Event & { target: HTMLInputElement }) {
    event.preventDefault()

    this.setState({
      file: event.target.files[0],
    })
  }

  handleUpload() {
    this.props.onUploadFile(this.props.name, this.state.file, this.props.uploadKeys)
  }

  handleChange: Function
  handleUpload: Function

  render() {
    const {
      isLoading,
      hasErrored,
      hasUploaded,
      label,
      name,
    } = this.props

    let status

    if (isLoading) {
      status = <Loading><p>Uploading image ...</p></Loading>
    } else if (hasErrored) {
      status = <Error><p>There was an error uploading the image</p></Error>
    } else if (hasUploaded) {
      status = <p>Image succesfully uploaded</p>
    }

    return (
      <div>
        {status}
        {label && <label htmlFor={name}>{label}</label>}<br />
        <input type="file" name={name} onChange={this.handleChange} />
        <button data-name={name} onClick={this.handleUpload}>Upload</button>
      </div>
    )
  }
}

FileUpload.defaultProps = {
  uploadKeys: {},
}

export default FileUpload
