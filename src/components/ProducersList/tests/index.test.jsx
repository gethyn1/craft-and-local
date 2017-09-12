import React from 'react'
import { shallow, mount } from 'enzyme'

import ProducersList from '../index'

describe('<ProducersList />', () => {
  let props
  let shallowComponent
  let mountedComponent

  const renderedShallow = () => {
    if (!shallowComponent) {
      shallowComponent = shallow(
        <ProducersList {...props} />,
      )
    }

    return shallowComponent
  }

  const renderedMounted = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <ProducersList {...props} />,
      )
    }

    return mountedComponent
  }

  beforeEach(() => {
    props = {
      categoryDoesNotExist: false,
      category: undefined,
      producers: undefined,
      fetchData: jest.fn(),
      hasErrored: false,
      isLoading: false,
      lat: undefined,
      lng: undefined,
      loadCount: undefined,
      loadMore: jest.fn(),
      resetProducers: jest.fn(),
      setActiveCategory: jest.fn(),
    }

    shallowComponent = undefined
    mountedComponent = undefined
  })

  it('should always render a containing div', () => {
    const rendered = renderedShallow()
    expect(rendered.find('div').length).toBeGreaterThanOrEqual(1)
  })

  it('should render the correct number of producers', () => {
    props.producers = [{ _id: '123' }, { _id: '456' }]
    const rendered = renderedShallow()
    expect(rendered.find('ProducerCard').length).toEqual(2)
  })

  it('should not call fetchData() by default', () => {
    // eslint-disable-next-line no-unused-vars
    const rendered = renderedMounted()
    expect(props.fetchData.mock.calls.length).toBe(0)
  })

  it('should call fetchData() if lat and lng are defined', () => {
    props.lat = 123
    props.lng = 456
    // eslint-disable-next-line no-unused-vars
    const rendered = renderedMounted()
    expect(props.fetchData.mock.calls.length).toBe(1)
  })

  it('should call fetchData() if lat and lng are updated', () => {
    props.lat = 123
    props.lng = 456
    const rendered = renderedMounted()
    rendered.setProps({ lat: 789, lng: 101 })
    expect(props.fetchData.mock.calls.length).toBe(2)
  })

  it('should display a load more button if producers is defined', () => {
    props.producers = [{ _id: '123' }]
    const rendered = renderedShallow()
    expect(rendered.find('Button').length).toBe(1)
  })

  it('should hide load more button when fetchData() returns same number of producers in same category', () => {
    props.producers = [{ _id: '123' }]
    props.category = '1'
    const rendered = renderedShallow()
    rendered.setProps({ producers: [{ _id: '123' }] })
    expect(rendered.find('Button').length).toBe(0)
  })

  it('should display load more button when category changes', () => {
    props.producers = [{ _id: '123' }]
    props.category = '1'
    const rendered = renderedShallow()
    rendered.setProps({ producers: [{ _id: '456' }], category: '2' })
    expect(rendered.find('Button').length).toBe(1)
  })

  it('should display <Loading /> when data is loading', () => {
    props.isLoading = true
    const rendered = renderedMounted()
    expect(rendered.find('Loading').length).toBe(1)
  })

  it('should display <Error /> when hasErrored is true', () => {
    props.hasErrored = true
    const rendered = renderedMounted()
    expect(rendered.find('Error').length).toBe(1)
  })

  it('should display information if no producers and not data loading', () => {
    const rendered = renderedShallow()
    expect(rendered.find('p').length).toBe(1)
  })

  it('should call handleLoadMore() when load more button is clicked', () => {
    props.producers = [{ _id: '123' }]
    const rendered = renderedShallow()
    rendered.find('Button').simulate('click')
    expect(props.loadMore.mock.calls.length).toBe(1)
  })

  it('should call handleLoadMore() with the correct arguments', () => {
    props.lat = 123
    props.lng = 456
    props.producers = [{ _id: '123' }]
    props.category = '1'
    const rendered = renderedShallow()
    rendered.find('Button').simulate('click')
    expect(props.loadMore.mock.calls).toEqual([
      [{ lat: 123, lng: 456 }, [{ _id: '123' }], '1'],
    ])
  })

  it('should redirect to 404 if categoryDoesNotExist is true', () => {
    props.categoryDoesNotExist = true
    const rendered = renderedShallow()
    expect(rendered.find('Redirect').length).toBe(1)
  })
})
