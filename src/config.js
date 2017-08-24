// @flow
export const WDS_PORT = 8080

export const APP_NAME = 'Craft & Local'

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAI0dZaZHkO6pUC1maNGg6HALwRX4nG0w4'
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`

export const API_URL = 'http://localhost:5000'
export const API_URL_PRODUCERS = `${API_URL}/producers`
export const API_URL_PRODUCERS_CREATE = `${API_URL_PRODUCERS}/create`
export const API_URL_CATEGORIES = `${API_URL}/categories`
export const API_URL_INSTAGRAM_FEED = `${API_URL}/instagram`
export const API_URL_USER_AUTH = `${API_URL}/user/authenticate`

export const STORAGE_JSON_WEB_TOKEN = 'jwt'
export const STORAGE_IS_ADMIN = 'isAdmin'
export const STORAGE_USER_EMAIL = 'userEmail'

export const isProd = process.env.NODE_ENV === 'production'
