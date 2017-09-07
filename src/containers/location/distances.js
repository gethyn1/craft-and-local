// @flow

export const deg2rad = (deg: number) => deg * (Math.PI / 180)

// Get distance between to sets of coordinates
export const getDistanceFromLatLonInKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) => {
  // Radius of the earth in km
  const R = 6371
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lng2 - lng1)
  const a =
    (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
    (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2))

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  // Distance in km
  const d = R * c
  return d
}
