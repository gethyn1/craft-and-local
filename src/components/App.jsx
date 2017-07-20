// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import CurrentLocation from '../containers/CurrentLocation'

import Container from './Container'
import TopBar from './TopBar'

import HomePage from './pages/HomePage'
import ProducerPage from './pages/ProducerPage'

const App = () => (
  <Container>
    <TopBar />
    <CurrentLocation />
    <Switch>
      <Route exact path={'/'} render={() => <HomePage />} />
      <Route path={'/producer/:producerId'} render={() => <ProducerPage />} />
    </Switch>
  </Container>
)

export default App
