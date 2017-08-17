// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import TopBar from './TopBar'

// import AuthenticatedRoute from './AuthenticatedRoute'
import Authenticated from '../containers/Authenticated'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NewProducerPage from './pages/NewProducerPage'
import ProducerPage from './pages/ProducerPage'

const App = () => (
  <div>
    <TopBar />
    <Switch>
      <Route exact path={'/'} render={() => <HomePage />} />
      <Route exact path={'/login'} render={() => <LoginPage />} />
      <Authenticated path={'/producer/create'} component={NewProducerPage} adminComponent />
      <Route path={'/producer/:userId'} render={() => <ProducerPage />} />
    </Switch>
  </div>
)

export default App
