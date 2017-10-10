import React from 'react'
import { mount } from 'enzyme'

import ProducerForm from '../index'

const mockCategories = [
  { _id: '1', title: 'category 1' },
  { _id: '2', title: 'category 2' },
]

describe('<ProducerForm />', () => {
  let props
  let mountedProducerForm

  const producerForm = () => {
    if (!mountedProducerForm) {
      mountedProducerForm = mount(
        <ProducerForm {...props} />,
      )
    }

    return mountedProducerForm
  }

  beforeEach(() => {
    props = {
      getProducer: jest.fn(),
      getCategories: jest.fn(),
      getLocalities: jest.fn(),
      categories: undefined,
      localities: undefined,
      isLoading: undefined,
      hasErrored: undefined,
      onSubmit: jest.fn(),
      geoCodingLookup: jest.fn(),
      geoCodingOptions: undefined,
      onGeoCodingSelect: jest.fn(),
      uploadsHasErrored: [],
      uploadsIsLoading: [],
      uploadedImages: [],
    }

    mountedProducerForm = undefined
  })

  it('always renders a single form container', () => {
    const form = producerForm().find('form')
    expect(form.length).toBe(1)
  })

  it('doesn\'t render any category checkboxes if no categories prop is defined', () => {
    const categoryChecboxes = producerForm().find('input[name="categories"]')
    expect(categoryChecboxes.length).toBe(0)
  })

  it('renders the correct number of category checkboxes if categories prop is defined', () => {
    props.categories = mockCategories
    const categoryChecboxes = producerForm().find('input[name="categories"]')
    expect(categoryChecboxes.length).toBe(2)
  })

  it('adds a category array to state.categories when a category checkbox is checked', () => {
    props.categories = mockCategories
    const component = producerForm()
    const categoryCheckbox = component.find('input[name="categories"]').first()
    categoryCheckbox.simulate('change', { target: { checked: true, value: '1' } })
    expect(component.state('categories')).toEqual(['1'])
  })

  it('removes category from state.categories when category checkbox is unchecked', () => {
    props.categories = mockCategories
    const component = producerForm()
    const categoryCheckbox = component.find('input[name="categories"]').first()
    categoryCheckbox.simulate('change', { target: { checked: true, value: '1' } })
    categoryCheckbox.simulate('change', { target: { checked: false, value: '1' } })
    expect(component.state('categories')).toEqual(null)
  })

  it('sets lng and lat state when data is passed to `handleAddressSelect`', () => {
    const component = producerForm()
    component.instance().handleAddressSelect({ id: '1', value: '123,456', option: 'test' })
    expect(component.state('lng')).toBe(123)
    expect(component.state('lat')).toBe(456)
  })

  it('sets address state when data is passed to `handleAddressSelect`', () => {
    const component = producerForm()
    component.instance().handleAddressSelect({ id: '1', value: '123,456', option: 'test' })
    expect(component.state('address')).toBe('test')
  })

  it('creates a dropdown with available localities', () => {
    props.localities = [{ _id: '1', title: 'test 1' }, { _id: '2', title: 'test 2' }]
    const select = producerForm().find('select[name="locality"]').first()
    const options = select.find('option')
    expect(options.length).toBe(3)
  })
})
