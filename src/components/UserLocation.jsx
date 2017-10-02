// @flow

import React from 'react'

type Props = {
  address: string,
  isLoading: boolean,
  hasErrored: boolean,
  getUserLocation: Function,
}

class UserLocation extends React.Component {
  componentDidMount() {
    // Only get user location if not passed explicitly as component property.
    if (!this.props.address) {
      this.props.getUserLocation()
    }
  }

  props: Props

  render() {
    const { address, isLoading, hasErrored } = this.props

    if (isLoading) {
      return <p className="u-margin-bottom-none">Finding your location ...</p>
    }

    if (hasErrored) {
      return <p className="u-margin-bottom-none">Sorry, there was an error getting your location ...</p>
    }

    return <p className="u-margin-bottom-none">Here are producers near {address}</p>
  }
}

export default UserLocation
