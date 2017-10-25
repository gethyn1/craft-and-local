import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import thunkMiddleware from 'redux-thunk'
import ReactGA from 'react-ga'

import { GA_DEBUG, GA_ID, isProd } from './config'

import App from './containers/App'

// eslint-disable-next-line
import sass from './styles/style.scss'

// Redux
import * as categories from './containers/ProducersPage/reducer.categories'
import * as createProducer from './containers/CreateProducerPage/reducer'
import * as editProducer from './containers/EditProducerPage/reducer'
import * as geocoding from './containers/geocoding/reducer'
import * as localities from './containers/localities/reducer'
import * as location from './containers/location/reducer'
import * as producer from './containers/ProducerPage/reducer'
import * as producers from './containers/ProducersPage/reducer.producers'
import * as session from './containers/session/reducer'
import * as uploads from './containers/uploads/reducer'
import rootReducer from './rootReducer'

// Google Analytics
ReactGA.initialize(GA_ID, {
  debug: GA_DEBUG,
})

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
/* eslint-enable no-underscore-dangle */

const defaultState = {
  categories: categories.initialState,
  createProducer: createProducer.initialState,
  editProducer: editProducer.initialState,
  geocoding: geocoding.initialState,
  localities: localities.initialState,
  location: location.initialState,
  producer: producer.initialState,
  producers: producers.initialState,
  session: session.initialState,
  uploads: uploads.initialState,
}

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

const rootEl = document.getElementById('app')

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./containers/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./containers/App').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
