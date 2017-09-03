// @flow

import React from 'react'
import ReactGA from 'react-ga'

import { GA_DEBUG, GA_ID } from '../../config'

ReactGA.initialize(GA_ID, {
  debug: GA_DEBUG,
})

type Props = {
  location: Object,
}

class GoogleAnalytics extends React.Component {
  constructor(props: Props) {
    super(props)

    // Initial page load - only fired once
    this.sendPageChange(props.location.pathname, props.location.search)
  }

  props: Props

  componentWillReceiveProps(nextProps) {
    // When props change, check if the URL has changed or not
    if (this.props.location.pathname !== nextProps.location.pathname
      || this.props.location.search !== nextProps.location.search) {
      this.sendPageChange(nextProps.location.pathname, nextProps.location.search)
    }
  }

  sendPageChange: Function

  sendPageChange(pathname, search='') {
    const page = pathname + search
    ReactGA.set({page})
    ReactGA.pageview(page)
  }

  render() {
    return null
  }
}

export default GoogleAnalytics
