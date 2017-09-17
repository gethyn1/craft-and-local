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
      return <p>Finding your location ...</p>
    }

    if (hasErrored) {
      return <p>Sorry, there was an error getting your location ...</p>
    }

    return <p>{address}</p>
  }
}

export default UserLocation
