// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/6-components/_components.filters.scss'

type Props = {
  categories: Array<Object>,
  active: ?string,
  fetchData: Function,
}

class CategoryFilters extends React.Component {
  componentDidMount() {
    this.props.fetchData()
  }

  componentWillUnmount() {
    this.props.resetCategories()
  }

  props: Props

  render() {
    const { categories, active } = this.props

    const filters = categories ? categories.map(category => (
      <li key={category._id} className={styles['filter-item']}>
        <Link
          to={`/producers/${category.slug}`}
          className={`${styles.filter} ${active === category._id ? styles.active : ''}`}
        >
          {category.title}
        </Link>
      </li>
    )) : null

    return (
      <div className={styles.wrapper}>
        <ul className={styles['filter-list']}>
          <li className={styles['filter-item']}>
            <Link
              to="/"
              className={`${styles.filter} ${!active ? styles.active : ''}`}
            >
              All
            </Link>
          </li>
          {filters}
        </ul>
      </div>
    )
  }
}

export default CategoryFilters
