// @flow

import React from 'react'

import { ASSET_BASE } from '../../config'
import FileUpload from '../FileUpload'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  upload: Object,
  userId: string,
  onUploadFile: Function,
  previewPath: ?string,
  resetUploads: Function,
}

type State = {
  previewPath: ?string,
}

class UploadAvatar extends React.Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.state = {
      previewPath: this.props.previewPath,
    }
  }

  state: State

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.previewPath === null) {
      this.setState({
        previewPath: nextProps.previewPath,
      })
    }

    if (nextProps.upload && nextProps.upload !== this.props.upload) {
      this.setState({
        previewPath: nextProps.upload.url,
      })
    }
  }

  componentWillUnmount() {
    this.props.resetUploads()
  }

  props: Props
  renderPreview: Function

  renderPreview() {
    const { previewPath } = this.state

    if (previewPath) {
      return <img alt="" style={{ width: '200px' }} src={`${ASSET_BASE}/${previewPath}`} />
    }

    return null
  }

  render() {
    const { hasErrored, isLoading, upload, onUploadFile, userId } = this.props
    return (
      <div>
        {this.renderPreview()}
        <FileUpload
          hasErrored={hasErrored}
          isLoading={isLoading}
          hasUploaded={!!upload}
          label="Avatar"
          name="avatar"
          onUploadFile={onUploadFile}
          uploadKeys={{ userId }}
        />
      </div>
    )
  }
}

UploadAvatar.defaultProps = {
  previewPath: null,
}

export default UploadAvatar
