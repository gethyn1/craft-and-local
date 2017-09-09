/* eslint-disable */
// Set any global variables defined using webpack definePlugin
// in order to stop build breaking
global.ENV_ENVIRONMENT = null
/* eslint-enable */

// eslint-disable-next-line no-undef
export const isProd = ENV_ENVIRONMENT === 'production'
export const WDS_PORT = 8080

export const APP_NAME = 'Craft & Local'

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAI0dZaZHkO6pUC1maNGg6HALwRX4nG0w4'
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`

export const API_URL = isProd ? 'https://craftandlocal.herokuapp.com' : 'http://localhost:5000'
export const APP_URL = 'https://piano-tuner-eagle-18310.netlify.com'

export const API_URL_PRODUCERS = `${API_URL}/producers`
export const API_URL_PRODUCERS_CREATE = `${API_URL_PRODUCERS}/create`
export const API_URL_CATEGORIES = `${API_URL}/categories`
export const API_URL_INSTAGRAM_FEED = `${API_URL}/instagram`
export const API_URL_USER_AUTH = `${API_URL}/user/authenticate`

export const STORAGE_JSON_WEB_TOKEN = 'jwt'
export const STORAGE_IS_ADMIN = 'isAdmin'
export const STORAGE_USER_EMAIL = 'userEmail'

export const SHARE_HASHTAGS = 'CraftAndLocal'
export const TWITTER_HANDLE = 'CraftAndLocal'

export const GA_ID = 'UA-xxxxxx-xx'
export const GA_DEBUG = false

export const NOT_FOUND_ROUTE = '404'

export const LOAD_PRODUCERS_COUNT = 1
