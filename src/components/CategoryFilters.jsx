// @flow

import React from 'react'

import ListBare from './ListBare'

import styles from '../styles/6-components/_components.filters.scss'

type Props = {
  categories: Array<Object>,
  active: ?string,
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
    const { categories, active, onClickFilter, lat, lng } = this.props

    const filters = categories ? categories.map(category => (
      <li key={category._id}>
        <button
          className={`${styles.filter} ${active === category._id ? styles.active : ''}`}
          onClick={() => { onClickFilter({ lat, lng }, category._id) }}
        >
          {category.title}
        </button>
      </li>
    )) : null

    return (
      <ListBare className={styles['filter-list']}>
        <li className={styles['filter-item']}>
          <button
            className={`${styles.filter} ${!active ? styles.active : ''}`}
            onClick={() => { onClickFilter({ lat, lng }) }}
          >
            All
          </button>
        </li>
        {filters}
      </ListBare>
    )
  }
}

export default CategoryFilters
