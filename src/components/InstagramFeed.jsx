// @flow

import React from 'react'

import { Layout, LayoutItem } from './Layout'

type Props = {
  items: Array<Object>,
  isLoading: boolean,
  hasErrored: boolean,
}

const InstagramFeed = ({ items, isLoading, hasErrored }: Props) => {
  if (isLoading) {
    return <p>Feed is loading ...</p>
  }

  if (hasErrored) {
    return <p>There was an error loading the instagram feed</p>
  }

  if (items) {
    const feedItems = items.map((item) => {
      const caption = item.caption ? item.caption.text : ''

      return (
        <LayoutItem key={item.id} cols="1/4">
          <img src={item.images.standard_resolution.url} alt={caption} />
        </LayoutItem>
      )
    })

    return (
      <Layout>
        {feedItems}
      </Layout>
    )
  }

  return null
}

export default InstagramFeed
