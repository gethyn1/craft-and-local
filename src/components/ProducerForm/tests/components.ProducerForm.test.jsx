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
      getCategories: jest.fn(),
      categories: undefined,
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

  it('sets lng and lat state when value is passed to `handleAddressSelect`', () => {
    const component = producerForm()
    component.instance().handleAddressSelect('123,456')
    expect(component.state('lng')).toBe(123)
    expect(component.state('lat')).toBe(456)
  })
})
