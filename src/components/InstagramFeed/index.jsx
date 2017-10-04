// @flow

import React from 'react'

import styles from '../../styles/6-components/_components.instagram-feed.scss'

type Props = {
  items: Array<Object>,
  isLoading: boolean,
  hasErrored: boolean,
  limit?: number,
}

const InstagramFeed = ({ limit, items, isLoading, hasErrored }: Props) => {
  if (isLoading) {
    return <p>Feed is loading ...</p>
  }

  if (hasErrored) {
    return <p>There was an error loading the instagram feed</p>
  }

  if (items) {
    const feedItems = items.map((item, index) => {
      if (limit && index >= limit) {
        return null
      }

      const caption = item.caption ? item.caption.text : ''

      return (
        <div key={item.id} className={styles.item}>
          <div className="o-ratio">
            <img src={item.images.standard_resolution.url} alt={caption} />
          </div>
        </div>
      )
    })

    return (
      <div className={styles.wrapper}>
        {feedItems}
      </div>
    )
  }

  return null
}

InstagramFeed.defaultProps = {
  limit: null,
}

export default InstagramFeed
