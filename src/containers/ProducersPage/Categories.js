// @flow

import { connect } from 'react-redux'

import {
  categoriesFetchData,
  categoriesSetActiveCategory,
} from './actions.categories'
import {
  producersFetchData,
  producersResetProducers,
} from './actions.producers'

import CategoryFilters from '../../components/CategoryFilters'

const mapStateToProps = state => ({
  active: state.categories.active,
  categories: state.categories.categories,
  hasErrored: state.categories.hasErrored,
  isLoading: state.categories.isLoading,
  lat: state.location.latitude,
  lng: state.location.longitude,
})

const mapDispatchToProps = dispatch => ({
  fetchData: () => {
    dispatch(categoriesFetchData())
  },
  onClickFilter: (latLng: Object, id: ?string) => {
    dispatch(producersResetProducers())
    if (id) {
      dispatch(producersFetchData({
        latlng: `${latLng.lat},${latLng.lng}`,
        categories_like: id,
      }))
      dispatch(categoriesSetActiveCategory(id))
    } else {
      dispatch(producersFetchData(latLng))
      dispatch(categoriesSetActiveCategory(null))
    }
  },
})

const Categories = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryFilters)

export default Categories
