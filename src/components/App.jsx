// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import UserLogin from '../containers/UserLogin'

import TopBar from './TopBar'

// import AuthenticatedRoute from './AuthenticatedRoute'
import Authenticated from '../containers/Authenticated'

import HomePage from './pages/HomePage'
import ProducerPage from './pages/ProducerPage'
import NewProducerPage from './pages/NewProducerPage'

const App = () => (
  <div>
    <TopBar />
    <UserLogin />
    <Switch>
      <Route exact path={'/'} render={() => <HomePage />} />
      {/* <Route path={'/producer/create'} render={() => <NewProducerPage />} /> */}
      <Authenticated path={'/producer/create'} component={NewProducerPage} />
      <Route path={'/producer/:userId'} render={() => <ProducerPage />} />
    </Switch>
  </div>
)

export default App
