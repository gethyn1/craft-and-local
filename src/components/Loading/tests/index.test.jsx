import React from 'react'
import { mount } from 'enzyme'
import Loading from '../index'

describe('<Loading />', () => {
  let props
  let mountedComponent

  const children = (<span>Loading ...</span>)

  const renderedComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <Loading {...props}>
          {children}
        </Loading>,
      )
    }

    return mountedComponent
  }

  beforeEach(() => {
    props = {}

    mountedComponent = undefined
  })

  it('should render a container div', () => {
    const rendered = renderedComponent()
    expect(rendered.find('div').length).toBeGreaterThanOrEqual(1)
  })

  it('should have children', () => {
    const rendered = renderedComponent()
    expect(rendered.contains(children)).toEqual(true)
  })
})
