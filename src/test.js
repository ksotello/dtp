import './setupTests'

import React from 'react'
import { mount } from 'enzyme'

import { DateTimePicker } from './'

describe('<DateTimePicker />', () => {
  let wrapper, TriggerComponent

  beforeEach(() => {
    TriggerComponent = () => <button>Trigger</button>
  })

  // cleanup
  afterEach(() => {
    wrapper && wrapper.unmount()
    wrapper = TriggerComponent = null
  })

  it('should mount', done => {
    wrapper = mount(<DateTimePicker />)
    expect(wrapper.exists()).toBe(true)
    done()
  })

  // AC 1: If using a trigger component, then hide the date time picker by default.
  it('should be hidden by default if a trigger component is used.', done => {
    wrapper = mount(<DateTimePicker trigger={<TriggerComponent />} />)
    expect(wrapper.find(TriggerComponent).length).toBe(1)
    expect(wrapper.find('.dtp').length).toBe(0)
    done()
  })

  // AC 2: If no trigger component it used, the display the date time picker.
  it('should display the date time picker by default if not trigger is used.', done => {
    wrapper = mount(<DateTimePicker />)
    expect(wrapper.find('.dtp').length).toBe(1)
    done()
  })
})
