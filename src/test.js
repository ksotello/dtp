import './setupTests'

import React from 'react'
import { mount } from 'enzyme'

import { DateTimePicker } from './'

describe('<DateTimePicker />', () => {
  let wrapper

  // cleanup
  afterEach(() => {
    wrapper && wrapper.unmount()
    wrapper = null
  })

  it('should mount', done => {
    wrapper = mount(<DateTimePicker />)
    expect(wrapper.exists()).toBe(true)
    done()
  })
})
