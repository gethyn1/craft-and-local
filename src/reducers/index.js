// @flow

import { combineReducers } from 'redux'

//import { categories } from './categories'
import { categories } from '../containers/ProducersPage/reducer.categories'
import { createProducer } from './createProducer'
import { geocoding } from './geocoding'
//import { location } from './location'
import { location } from '../containers/location/reducer'
import { producer } from '../containers/ProducerPage/reducer'
//import { producers } from './producers'
import { producers } from '../containers/ProducersPage/reducer.producers'
//import { session } from './session'
import { session } from '../containers/session/reducer'

const rootReducer = combineReducers({
  categories,
  createProducer,
  geocoding,
  location,
  producer,
  producers,
  session,
})

export default rootReducer
