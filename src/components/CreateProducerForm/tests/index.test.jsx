import React from 'react'
import { mount, shallow } from 'enzyme'

import CreateProducerForm from '../index'

describe('<CreateProducerForm />', () => {
  let props
  let mountedCreateProducerForm
  let shallowCreateProducerForm

  const mountedComponent = () => {
    if (!mountedCreateProducerForm) {
      mountedCreateProducerForm = mount(
        <CreateProducerForm {...props} />,
      )
    }

    return mountedCreateProducerForm
  }

  const shallowComponent = () => {
    if (!shallowCreateProducerForm) {
      shallowCreateProducerForm = shallow(
        <CreateProducerForm {...props} />,
      )
    }

    return shallowCreateProducerForm
  }

  beforeEach(() => {
    props = {
      hasCreatedProducer: false,
      hasErrored: false,
      isLoading: false,
      onSubmit: jest.fn(),
    }

    mountedCreateProducerForm = undefined
  })

  it('should render a title field', () => {
    const field = mountedComponent().find('input[name="title"]')
    expect(field.length).toBe(1)
  })

  it('should render a user ID field', () => {
    const field = mountedComponent().find('input[name="user_id"]')
    expect(field.length).toBe(1)
  })

  it('should update state when title field is updated', () => {
    const form = mountedComponent()
    const field = form.find('input[name="title"]').first()
    field.simulate('change', { target: { name: 'title', value: 'test' } })
    expect(form.state('title')).toEqual('test')
  })

  it('should update state when user ID field is updated', () => {
    const form = mountedComponent()
    const field = form.find('input[name="user_id"]').first()
    field.simulate('change', { target: { name: 'user_id', value: 'test' } })
    expect(form.state('user_id')).toEqual('test')
  })

  it('should call props.onSubmit when form is submitted', () => {
    const form = mountedComponent().find('form').first()
    form.simulate('submit')
    expect(props.onSubmit.mock.calls.length).toBe(1)
  })

  it('should redirect to producer page on successful producer creation', () => {
    props.hasCreatedProducer = true
    const rendered = shallowComponent()
    rendered.setState({ user_id: 'test' })
    expect(rendered.find('Redirect').length).toBe(1)
  })

  it('should render an error if props.hasErrored is true', () => {
    props.hasErrored = true
    const error = mountedComponent().find('Error')
    expect(error.length).toEqual(1)
  })

  it('should render a loading message if props.isLoading is true', () => {
    props.isLoading = true
    const loading = mountedComponent().find('Loading')
    expect(loading.length).toEqual(1)
  })
})
