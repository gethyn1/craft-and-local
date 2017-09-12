// @flow

import { connect } from 'react-redux'

import {
  categoriesFetchData,
  categoriesSetActiveCategory,
} from './actions.categories'

import CategoryFilters from '../../components/CategoryFilters'

const mapStateToProps = state => ({
  active: state.categories.active,
  categories: state.categories.categories,
  hasErrored: state.categories.hasErrored,
  isLoading: state.categories.isLoading,
})

const mapDispatchToProps = dispatch => ({
  fetchData: () => {
    dispatch(categoriesFetchData())
  },
  resetCategories: () => {
    dispatch(categoriesSetActiveCategory(null))
  },
})

const Categories = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryFilters)

export default Categories
