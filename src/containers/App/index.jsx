// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import { isProd } from '../../config'

import Authenticated from '../session/Authenticated'
import UserUtils from '../UserUtils'
import ProducersPage from '../ProducersPage'
import LoginPage from '../LoginPage'
import CreateProducerPage from '../CreateProducerPage'
import NotFoundPage from '../NotFoundPage'
import ProducerPage from '../ProducerPage'

import GoogleAnalytics from '../../components/GoogleAnalytics'

const App = () => (
  <div>
    <UserUtils />
    {isProd && <Route path="/" component={GoogleAnalytics} />}
    <Route
      path="/"
      render={() => {
        window.scrollTo(0, 0)
        return null
      }}
    />
    <Switch>
      <Route exact path={'/'} render={() => <ProducersPage />} />
      <Route exact path={'/producers/:category'} render={() => <ProducersPage />} />
      <Authenticated path={'/producer/create'} component={CreateProducerPage} adminComponent />
      <Route path={'/producer/:userId'} render={() => <ProducerPage />} />
      <Route exact path={'/login'} render={() => <LoginPage />} />
      <Route render={() => <NotFoundPage />} />
    </Switch>
  </div>
)

export default App
