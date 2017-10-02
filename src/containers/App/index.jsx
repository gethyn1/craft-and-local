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
import EditProducerPage from '../EditProducerPage'
import NotFoundPage from '../NotFoundPage'
import ProducerPage from '../ProducerPage'

import Footer from '../../components/Footer'
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
      <Authenticated path={'/producer/edit/:userId'} component={EditProducerPage} adminComponent />
      <Route path={'/producer/:userId'} render={() => <ProducerPage />} />
      <Route exact path={'/login'} render={() => <LoginPage />} />
      <Route render={() => <NotFoundPage />} />
    </Switch>
    <Footer />
  </div>
)

export default App
