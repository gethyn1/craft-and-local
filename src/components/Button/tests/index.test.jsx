import React from 'react'
import { mount } from 'enzyme'
import Button from '../index'

describe('<Button />', () => {
  let props
  let mountedComponent

  const children = (<span>Test</span>)

  const renderedComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <Button {...props}>
          {children}
        </Button>,
      )
    }

    return mountedComponent
  }

  beforeEach(() => {
    props = {
      href: undefined,
      className: undefined,
      onClick: undefined,
      type: undefined,
    }

    mountedComponent = undefined
  })

  it('should render an <a> tag if href is specified', () => {
    props.href = 'https://google.com'
    const rendered = renderedComponent()
    expect(rendered.find('a').length).toBe(1)
  })

  it('should render a <button> tag if no href is specified', () => {
    const rendered = renderedComponent()
    expect(rendered.find('button').length).toBe(1)
  })

  it('should have children', () => {
    const rendered = renderedComponent()
    expect(rendered.contains(children)).toEqual(true)
  })

  it('should update <button> type attribute if type is specified', () => {
    props.type = 'submit'
    const rendered = renderedComponent()
    expect(rendered.find('button').prop('type')).toEqual('submit')
  })

  it('should handle click events', () => {
    props.onClick = jest.fn()
    const rendered = renderedComponent()
    rendered.simulate('click')
    expect(props.onClick.mock.calls.length).toBe(1)
  })

  it('should have a className attribute', () => {
    props.className = 'test'
    const rendered = renderedComponent()
    expect(rendered.find('button').hasClass('test')).toBe(true)
  })
})
