// @flow
/* global google */

import React from 'react'
import scriptLoader from 'react-async-script-loader'

import { GOOGLE_MAPS_URL } from '../config'

type Props = {
  latitude?: number,
  longitude?: number,
  zoom?: number,
  markers?: Array<Object>,
  addCenterMarker?: boolean,
  isScriptLoaded: boolean,
  isScriptLoadSucceed: boolean,
}

// flow-disable-next-line
@scriptLoader([GOOGLE_MAPS_URL])
class GoogleMap extends React.Component {
  static defaultProps: Object

  static addMarker(pos: Object, map: HTMLElement, title: string) {
    // flow-disable-next-line
    const infowindow = new google.maps.InfoWindow({
      content: `<p>${title}</p>`,
    })

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(pos),
      title,
    })

    marker.addListener('click', () => infowindow.open(map, marker))

    return marker.setMap(map)
  }

  constructor(props: Props) {
    super(props)

    this.map = null
    this.marker = null
    this.mapContainer = null
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      latitude,
      longitude,
      zoom,
      markers,
      addCenterMarker,
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps

    if (isScriptLoaded && isScriptLoadSucceed) {
      // flow-disable-next-line
      this.map = new google.maps.Map(this.mapContainer, {
        zoom,
      })

      if (this.map && latitude && longitude) {
        const pos = {
          lat: latitude,
          lng: longitude,
        }

        this.map.setCenter(pos)

        // Add central marker for current position
        if (addCenterMarker) {
          this.constructor.addMarker(pos, this.map, '')
        }

        // Add producer state markers
        this.addMarkers(markers)
      }
    }
  }

  props: Props
  map: any
  marker: any
  mapContainer: any
  addMarkers: Function

  addMarkers(markers: Array<Object>) {
    markers.forEach((item) => {
      this.constructor.addMarker({
        lat: item.lat,
        lng: item.lng,
      }, this.map, item.title)
    })
  }

  render() {
    const mapStyles = {
      height: '400px',
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
  markers: [],
  addCenterMarker: true,
  onScriptLoaded: () => {},
}

export default GoogleMap
