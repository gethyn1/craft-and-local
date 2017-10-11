// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import { ASSET_BASE } from '../config'

import Avatar from './Avatar'
import Distance from './Distance'
import Icon from './Icon'

/* eslint-disable no-unused-vars */
import locationIcon from '../images/icons/location.svg'
/* eslint-enable no-unused-vars */

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
      <Avatar size="small" className="u-margin-bottom" alt={producer.title} src={`${ASSET_BASE}/${producer.avatar}`} />
      <h2 className={styles.title}>{producer.title}</h2>
      <p className={styles.categories}>{categories}</p>
      <div className={styles.distance}>
        <Icon type="location" size="12" />
        <Distance
          from={{ lat, lng }}
          to={{ lat: coords[1], lng: coords[0] }}
        />
      </div>
    </Link>
  )
}

export default ProducerCard
