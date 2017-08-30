// @flow

import { combineReducers } from 'redux'

import { categories } from './categories'
import { createProducer } from './createProducer'
import { geocoding } from './geocoding'
import { location } from './location'
import { producer } from './producer'
import { producers } from './producers'
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
