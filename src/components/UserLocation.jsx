// @flow

import React from 'react'

import GoogleMap from './GoogleMap'

type Props = {
  address: string,
  isLoading: boolean,
  hasErrored: boolean,
  longitude: number,
  latitude: number,
  getUserLocation: Function,
  markers: Array<Object>,
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
    const { isLoading, hasErrored, latitude, longitude, markers } = this.props

    if (isLoading) {
      return <p>Finding your location ...</p>
    }

    if (hasErrored) {
      return <p>Sorry, there was an error getting your location ...</p>
    }

    return (
      <div>
        <GoogleMap
          longitude={longitude}
          latitude={latitude}
          zoom={12}
          markers={markers}
          addCenterMarker={false}
        />
      </div>
    )
  }
}

export default UserLocation
