// @flow

import { combineReducers } from 'redux'

import { location } from './location'
import { producer } from './producer'
import { producers } from './producers'
import { categories } from './categories'

const rootReducer = combineReducers({
  location,
  producer,
  producers,
  categories,
})

export default rootReducer
