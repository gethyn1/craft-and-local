import React from 'react'
import { mount } from 'enzyme'
import ImageUpload from '../index'

describe('<ImageUpload />', () => {
  let props
  let mountedComponent

  const renderedComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <ImageUpload {...props} />,
      )
    }

    return mountedComponent
  }

  beforeEach(() => {
    props = {
      hasErrored: false,
      hasUploaded: false,
      isLoading: false,
      label: undefined,
      name: undefined,
      onImageSelected: jest.fn(),
      onUploadImage: jest.fn(),
    }

    mountedComponent = undefined
  })

  it('should render a containing div', () => {
    const rendered = renderedComponent()
    expect(rendered.find('div').length).toBeGreaterThanOrEqual(1)
  })

  it('should contain a single file input', () => {
    const rendered = renderedComponent()
    expect(rendered.find('input[type="file"]').length).toEqual(1)
  })

  it('should not display a label if props.label is not defined', () => {
    const rendered = renderedComponent()
    expect(rendered.find('label').length).toEqual(0)
  })

  it('should contain a single label for the input if props.label is defined', () => {
    props.label = 'test'
    const rendered = renderedComponent()
    expect(rendered.find('label').length).toEqual(1)
  })

  it('should set the name attribute for the input', () => {
    props.name = 'test'
    const rendered = renderedComponent()
    expect(rendered.find('input[type="file"]').prop('name')).toBe('test')
  })

  it('should have an upload button', () => {
    const button = renderedComponent().find('button')
    expect(button.length).toEqual(1)
  })

  it('should trigger props.onUploadImage when button is clicked', () => {
    const button = renderedComponent().find('button')
    button.simulate('click')
    expect(props.onUploadImage.mock.calls.length).toBe(1)
  })

  it('should display error when props.hasErrored is true', () => {
    props.hasErrored = true
    const error = renderedComponent().find('Error')
    expect(error.length).toEqual(1)
  })

  it('should display a loading message when props.isLoading is true', () => {
    props.isLoading = true
    const loading = renderedComponent().find('Loading')
    expect(loading.length).toEqual(1)
  })

  it('should update state.file with input value when file is selected', () => {
    const rendered = renderedComponent()
    const input = rendered.find('input[type="file"]')
    input.simulate('change', { target: { files: ['test'] } })
    expect(rendered.state().file).toBe('test')
  })
})
