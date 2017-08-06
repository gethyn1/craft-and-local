// @flow

import React from 'react'
import { Link } from 'react-router-dom'

// import Icon from './Icon'
import Distance from './Distance'

// eslint-disable-next-line no-unused-vars
import WineIcon from '../images/icons/wine.svg'

import styles from '../styles/6-components/_components.producer-card.scss'

type Props = {
  producer: Object,
  lat: number,
  lng: number,
}

const ProducerCard = ({ producer, lat, lng }: Props) => {
  const coords = producer.location.coordinates

  const categories = producer.categories.map((category, i) => (
    <span key={category._id}>
      <span>{category.title}</span>
      {i + 1 === producer.categories.length ? null : ', '}
    </span>
  ))

  return (
    <Link className={styles.card} to={`/producer/${producer.user_id}`}>
      <div className={styles.icon}>
        {/* <Icon type="wine" size="50" /> */}
      </div>
      <h2 className={styles.title}>{producer.title}</h2>
      <p>{categories}</p>
      <div className={styles.distance}>
        <Distance
          from={{ lat, lng }}
          to={{ lat: coords[1], lng: coords[0] }}
        />
      </div>
    </Link>
  )
}

export default ProducerCard
