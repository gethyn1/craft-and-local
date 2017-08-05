// @flow

import React from 'react'

import { Layout, LayoutItem } from './Layout'

type Props = {
  items: Array<Object>,
}

const InstagramFeed = ({ items }: Props) => {
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

export default InstagramFeed
