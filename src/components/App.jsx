// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import Authenticated from '../containers/session/Authenticated'
import UserUtils from '../containers/UserUtils'
import ProducersPage from '../containers/ProducersPage'
import LoginPage from '../containers/LoginPage'
import CreateProducerPage from '../containers/CreateProducerPage'
import NotFoundPage from '../containers/NotFoundPage'
import ProducerPage from '../containers/ProducerPage'

const App = () => (
  <div>
    <UserUtils />
    <Switch>
      <Route exact path={'/'} render={() => <ProducersPage />} />
      <Route exact path={'/login'} render={() => <LoginPage />} />
      <Authenticated path={'/producer/create'} component={CreateProducerPage} adminComponent />
      <Route path={'/producer/:userId'} render={() => <ProducerPage />} />
      <Route render={() => <NotFoundPage />} />
    </Switch>
  </div>
)

export default App
