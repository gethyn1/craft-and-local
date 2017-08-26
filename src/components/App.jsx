// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import Authenticated from '../containers/Authenticated'
import UserUtils from '../containers/UserUtils'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NewProducerPage from './pages/NewProducerPage'
import NotFoundPage from './pages/NotFoundPage'
import ProducerPage from './pages/ProducerPage'

const App = () => (
  <div>
    <UserUtils />
    <Switch>
      <Route exact path={'/'} render={() => <HomePage />} />
      <Route exact path={'/login'} render={() => <LoginPage />} />
      <Authenticated path={'/producer/create'} component={NewProducerPage} adminComponent />
      <Route path={'/producer/:userId'} render={() => <ProducerPage />} />
      <Route render={() => <NotFoundPage />} />
    </Switch>
  </div>
)

export default App
