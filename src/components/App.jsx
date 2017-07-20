// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import Container from './Container'
import TopBar from './TopBar'

import HomePage from './pages/HomePage'
import ProducerPage from './pages/ProducerPage'

const App = () => (
  <Container>
    <TopBar />
    <Switch>
      <Route exact path={'/'} render={() => <HomePage />} />
      <Route path={'/producer/:userId'} render={() => <ProducerPage />} />
    </Switch>
  </Container>
)

export default App
