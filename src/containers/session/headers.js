// @flow

const setAuthHeaders = (headers: Object, key: string) => {
  const jwtToken = sessionStorage.getItem(key)

  if (jwtToken !== null) {
    headers.set('Authorization', jwtToken)
  }

  return null
}

const setJSONHeaders = (headers: Object) => {
  headers.set('Content-Type', 'application/json')

  return null
}

const createPostHeaders = (authenticate: string, JSON: boolean = false) => {
  const headers = new Headers()

  if (JSON) {
    setJSONHeaders(headers)
  }

  if (authenticate) {
    setAuthHeaders(headers, authenticate)
  }

  return headers
}

export default createPostHeaders
