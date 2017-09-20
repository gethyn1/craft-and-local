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
  onImageSelected: Function,
  onUploadImage: Function,
  onImageUploaded: Function,
}

const ImageUpload = ({
  hasErrored,
  hasUploaded,
  isLoading,
  label,
  name,
  onImageSelected,
  onUploadImage,
  onImageUploaded,
}: Props) => {
  let status

  if (isLoading) {
    status = <Loading><p>Uploading image ...</p></Loading>
  } else if (hasErrored) {
    status = <Error><p>There was an error uploading the image</p></Error>
  } else if (hasUploaded) {
    status = <p>Image succesfully uploaded</p>
    onImageUploaded(name)
  }

  return (
    <div>
      {status}
      {label && <label htmlFor={name}>{label}</label>}
      <input type="file" name={name} onChange={onImageSelected} />
      <button data-name={name} onClick={onUploadImage}>Upload</button>
    </div>
  )
}

export default ImageUpload
