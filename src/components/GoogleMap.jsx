// @flow
/* global google */

import React from 'react'
import scriptLoader from 'react-async-script-loader'

import { GOOGLE_MAPS_URL } from '../config'

type Props = {
  latitude?: number,
  longitude?: number,
  zoom?: number,
  isScriptLoaded: boolean,
  isScriptLoadSucceed: boolean,
}

// flow-disable-next-line
@scriptLoader([GOOGLE_MAPS_URL])
class GoogleMap extends React.Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.map = null
    this.marker = null
    this.mapContainer = null
  }

  componentWillReceiveProps({
    latitude,
    longitude,
    zoom,
    isScriptLoaded,
    isScriptLoadSucceed,
  }: Props) {
    if (isScriptLoaded && isScriptLoadSucceed) {
      // flow-disable-next-line
      this.map = new google.maps.Map(this.mapContainer, {
        zoom,
      })

      if (this.map && latitude && longitude) {
        const pos = new google.maps.LatLng({
          lat: latitude,
          lng: longitude,
        })

        this.map.setCenter(pos)

        this.marker = new google.maps.Marker({
          position: pos,
          map: this.map,
        })
      }
    }
  }

  props: Props
  map: any
  marker: any
  mapContainer: any

  render() {
    const mapStyles = {
      height: '30%',
      width: '100%',
    }

    return (
      <div>
        <div ref={(c) => { this.mapContainer = c }} style={mapStyles} />
        { !this.map && <div>Loading...</div> }
      </div>
    )
  }
}

GoogleMap.defaultProps = {
  latitude: 51.534915,
  longitude: -0.129111,
  zoom: 15,
  onScriptLoaded: () => {},
}

export default GoogleMap
