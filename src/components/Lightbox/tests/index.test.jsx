import React from 'react'
import { shallow } from 'enzyme'
import Lightbox from '../index'

import styles from '../../../styles/6-components/_components.lightbox.scss'

describe('<Lightbox />', () => {
  let props
  let shallowComponent

  const children = (<h1>Test</h1>)

  const renderedComponent = () => {
    if (!shallowComponent) {
      shallowComponent = shallow(
        <Lightbox {...props}>
          {children}
        </Lightbox>,
      )
    }

    return shallowComponent
  }

  beforeEach(() => {
    props = {
      isVisible: false,
      toggleVisibility: jest.fn(),
    }

    shallowComponent = undefined
  })

  it('should not be visible by default', () => {
    const rendered = renderedComponent()
    expect(rendered.type()).toBeNull()
  })

  it('should be visible when visibility prop is set to true', () => {
    props.isVisible = true
    const rendered = renderedComponent()
    expect(rendered.find('div').length).toBeGreaterThan(0)
  })

  it('should contain children', () => {
    props.isVisible = true
    const rendered = renderedComponent()
    expect(rendered.contains(children)).toEqual(true)
  })

  it('should call `toggleVisibility` when close button is clicked', () => {
    props.isVisible = true
    const rendered = renderedComponent()
    const button = rendered.find('button').first()
    button.simulate('click')
    expect(props.toggleVisibility.mock.calls.length).toBe(1)
  })

  it('should toggle call `toggleVisibility` if user clicks outside of content area', () => {
    props.isVisible = true
    const rendered = renderedComponent()
    const overlay = rendered.find(`.${styles.overlay}`).first()
    overlay.simulate('click', { target: overlay, currentTarget: overlay })
    expect(props.toggleVisibility.mock.calls.length).toBe(1)
  })

  it('should toggle not call `toggleVisibility` if user clicks content area', () => {
    props.isVisible = true
    const rendered = renderedComponent()
    const overlay = rendered.find(`.${styles.overlay}`).first()
    const content = rendered.find(`.${styles.content}`).first()
    overlay.simulate('click', { target: overlay, currentTarget: content })
    expect(props.toggleVisibility.mock.calls.length).toBe(0)
  })
})
