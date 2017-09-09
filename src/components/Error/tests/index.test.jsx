import React from 'react'
import { mount } from 'enzyme'
import Error from '../index'

describe('<Error />', () => {
  let props
  let mountedComponent

  const children = (<span>There was an error</span>)

  const renderedComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <Error {...props}>
          {children}
        </Error>,
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
