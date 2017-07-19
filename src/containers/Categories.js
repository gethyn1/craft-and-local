// @flow

import { connect } from 'react-redux'

import { categoriesFetchData } from '../actions/categories'
import {
  producersFetchData,
  producersFilterByCategory,
} from '../actions/producers'

import CategoryFilters from '../components/CategoryFilters'

const mapStateToProps = state => ({
  categories: state.categories.categories,
  hasErrored: state.categories.hasErrored,
  isLoading: state.categories.isLoading,
})

const mapDispatchToProps = dispatch => ({
  fetchData: () => {
    dispatch(categoriesFetchData())
  },
  onClickFilter: (id: ?string) => {
    if (id) {
      dispatch(producersFilterByCategory(id))
    } else {
      dispatch(producersFetchData())
    }
  },
})

const Categories = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryFilters)

export default Categories
