// @flow

import React from 'react'

import GoogleMap from './GoogleMap'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  longitude: number,
  latitude: number,
  address: string,
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
    const { isLoading, hasErrored, latitude, longitude, address } = this.props

    if (isLoading) {
      return <p>Finding your location ...</p>
    }

    if (hasErrored) {
      return <p>Sorry, there was an error getting your location ...</p>
    }

    return (
      <div>
        <p>
          Your location:<br />
          <strong>latitude:</strong> {latitude}<br />
          <strong>longitude:</strong> {longitude}<br />
          {address}
        </p>
        <GoogleMap longitude={longitude} latitude={latitude} zoom={15} />
      </div>
    )
  }
}

export default UserLocation
