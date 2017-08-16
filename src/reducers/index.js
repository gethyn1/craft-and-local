// @flow

import { combineReducers } from 'redux'

import { categories } from './categories'
import { createProducer } from './createProducer'
import { location } from './location'
import { producer } from './producer'
import { producers } from './producers'
import { session } from './session'

const rootReducer = combineReducers({
  categories,
  createProducer,
  location,
  producer,
  producers,
  session,
})

export default rootReducer
