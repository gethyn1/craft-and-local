// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import TopBar from './TopBar'

import HomePage from './pages/HomePage'
import ProducerPage from './pages/ProducerPage'
import NewProducerPage from './pages/NewProducerPage'

const App = () => (
  <div>
    <TopBar />
    <Switch>
      <Route exact path={'/'} render={() => <HomePage />} />
      <Route path={'/producer/create'} render={() => <NewProducerPage />} />
      <Route path={'/producer/:userId'} render={() => <ProducerPage />} />
    </Switch>
  </div>
)

export default App
