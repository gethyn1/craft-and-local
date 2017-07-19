// @flow
export const WDS_PORT = 8080

export const APP_NAME = 'Craft & Local'

export const GOOGLE_MAPS_API_KEY = 'GOOGLE_API_KEY'
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`

export const API_URL = 'http://localhost:3000'
export const API_URL_PRODUCERS = `${API_URL}/producers`
export const API_URL_CATEGORIES = `${API_URL}/categories`

export const isProd = process.env.NODE_ENV === 'production'
