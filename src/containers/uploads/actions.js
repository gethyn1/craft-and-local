// @flow

import types from './constants'

export const fileIsUploadingAdd = (payload: string) => ({
  type: types.FILE_IS_UPLOADING_ADD,
  payload,
})

export const fileIsUploadingRemove = (payload: string) => ({
  type: types.FILE_IS_UPLOADING_REMOVE,
  payload,
})

export const fileHasErroredAdd = (payload: string) => ({
  type: types.FILE_HAS_ERRORED_ADD,
  payload,
})

export const fileHasErroredRemove = (payload: string) => ({
  type: types.FILE_HAS_ERRORED_REMOVE,
  payload,
})

export const fileUploadSuccess = (payload: Object) => ({
  type: types.FILE_UPLOAD_SUCCESS,
  payload,
})

export const uploadFile = (id: string, file: Object) => (dispatch: Function) => {
  const url = 'http://localhost:5000/images/upload'
  const formData = new FormData()
  formData.append('avatar', file)

  dispatch(fileIsUploadingAdd(id))

  return fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(fileIsUploadingRemove(id))
      return response
    })
    .then(response => response.json())
    .then((data) => {
      dispatch(fileUploadSuccess({
        id,
        url: data.data.url,
      }))
    })
    .catch(() => {
      fileIsUploadingRemove(id)
      dispatch(fileHasErroredAdd(id))
    })
}
