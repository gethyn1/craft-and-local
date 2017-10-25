// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { getDistanceBetweenPoints } from '../location/distances'
import {
  producersFetchData,
  producersResetProducers,
} from './actions.producers'
import { categoriesSetActiveCategory } from './actions.categories'
import ProducersList from '../../components/ProducersList'

const getCategoryFromSlug = (categories: Array<Object>, slug: string) =>
  categories.find(category => category.slug === slug)

const mapStateToProps = (state: Object, ownProps: Object) => {
  const { params } = ownProps.match
  const { categories } = state.categories

  let category = null
  let categoryFromSlug = null
  let categoryDoesNotExist = false

  if (categories && params.category) {
    categoryFromSlug = getCategoryFromSlug(state.categories.categories, params.category)
  }

  if (categoryFromSlug) {
    category = categoryFromSlug._id
  }

  if (params.category && categories && !category) {
    categoryDoesNotExist = true
  }

  return {
    category,
    categoryDoesNotExist,
    categories,
    hasErrored: state.producers.hasErrored,
    isLoading: state.producers.isLoading,
    lat: state.location.latitude,
    lng: state.location.longitude,
    loadCount: 2,
    path: params.category,
    producers: state.producers.producers,
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  fetchData: (params: Object) => {
    dispatch(producersFetchData({
      categories_like: params.category,
      latlng: `${params.lat},${params.lng}`,
    }))
  },
  loadMore: (latLng: Object, producers: Array<Object>, category: string) => {
    const furthestCoords = producers[producers.length - 1].location.coordinates

    const minDistance = getDistanceBetweenPoints(
      latLng.lat,
      latLng.lng,
      furthestCoords[1],
      furthestCoords[0],
    )

    const excludeProducers = producers.filter((producer) => {
      const coords = producer.location.coordinates
      const distance = getDistanceBetweenPoints(latLng.lat, latLng.lng, coords[1], coords[0])
      return distance === minDistance
    })

    const excludeProducerIds = excludeProducers.map((producer: Object) => producer._id)
    const queryParams = {}

    queryParams.latlng = `${latLng.lat},${latLng.lng}`
    queryParams.mindistance = minDistance
    queryParams.exclude = excludeProducerIds

    if (category) {
      queryParams.categories_like = category
    }

    dispatch(producersFetchData(queryParams))
  },
  setActiveCategory: (category: string) => {
    dispatch(categoriesSetActiveCategory(category))
  },
  resetProducers: () => {
    dispatch(producersResetProducers())
  },
})

const AllProducers = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducersList))

export default AllProducers
