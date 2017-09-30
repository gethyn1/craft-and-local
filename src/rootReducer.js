// @flow

import { combineReducers } from 'redux'

import { categories } from './containers/ProducersPage/reducer.categories'
import { createProducer } from './containers/CreateProducerPage/reducer'
import { editProducer } from './containers/EditProducerPage/reducer'
import { geocoding } from './containers/geocoding/reducer'
import { location } from './containers/location/reducer'
import { producer } from './containers/ProducerPage/reducer'
import { producers } from './containers/ProducersPage/reducer.producers'
import { session } from './containers/session/reducer'
import { uploads } from './containers/uploads/reducer'

const rootReducer = combineReducers({
  categories,
  createProducer,
  editProducer,
  geocoding,
  location,
  producer,
  producers,
  session,
  uploads,
})

export default rootReducer
