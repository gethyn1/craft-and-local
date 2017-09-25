// @flow

import {
  API_URL_UPLOADS_AVATAR,
  STORAGE_JSON_WEB_TOKEN,
} from '../../config'

import createPostHeaders from '../session/headers'
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

export const fileUploadSuccessAdd = (payload: Object) => ({
  type: types.FILE_UPLOAD_SUCCESS_ADD,
  payload,
})

export const fileUploadSuccessRemove = (payload: string) => ({
  type: types.FILE_UPLOAD_SUCCESS_REMOVE,
  payload,
})

export const fileUploadFile = (id: string, file: Object, url: string) => (dispatch: Function) => {
  const formData = new FormData()
  formData.append(id, file)

  dispatch(fileIsUploadingAdd(id))

  return fetch(url, {
    method: 'POST',
    body: formData,
    headers: createPostHeaders(STORAGE_JSON_WEB_TOKEN),
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
      dispatch(fileUploadSuccessAdd({
        id,
        url: data.data.url,
      }))
    })
    .catch(() => {
      fileIsUploadingRemove(id)
      dispatch(fileHasErroredAdd(id))
    })
}

export const fileUploadAvatar = (id: string, file: Object) =>
  fileUploadFile(id, file, API_URL_UPLOADS_AVATAR)
