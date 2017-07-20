// @flow

import React from 'react'

import ListInline from './ListInline'

// import styles from '../styles/6-components/_components.category-filters.scss'

type Props = {
  categories: Array<Object>,
  fetchData: Function,
  onClickFilter: Function,
  lat: number,
  lng: number,
}

class CategoryFilters extends React.Component {
  componentDidMount() {
    this.props.fetchData()
  }

  props: Props

  render() {
    const { categories, onClickFilter, lat, lng } = this.props

    const filters = categories.map(category => (
      <li key={category._id}>
        <button onClick={() => { onClickFilter({ lat, lng }, category._id) }}>
          {category.title}
        </button>
      </li>
    ))

    return (
      <ListInline>
        <li>
          <button onClick={() => { onClickFilter({ lat, lng }) }}>All</button>
        </li>
        {filters}
      </ListInline>
    )
  }
}

export default CategoryFilters
