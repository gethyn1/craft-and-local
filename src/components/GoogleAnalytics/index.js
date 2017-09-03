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
  static sendPageChange(pathname, search = '') {
    const page = pathname + search
    ReactGA.set({ page })
    ReactGA.pageview(page)
  }

  constructor(props: Props) {
    super(props)

    // Initial page load - only fired once
    this.constructor.sendPageChange(props.location.pathname, props.location.search)
  }

  componentWillReceiveProps(nextProps: Props) {
    // When props change, check if the URL has changed or not
    if (this.props.location.pathname !== nextProps.location.pathname
      || this.props.location.search !== nextProps.location.search) {
      this.constructor.sendPageChange(nextProps.location.pathname, nextProps.location.search)
    }
  }

  props: Props

  render() {
    return null
  }
}

export default GoogleAnalytics
