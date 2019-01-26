import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import styles from './styles.css'

class DateTimePicker extends Component {
  static propTypes = {
    trigger: PropTypes.node
  }

  render() {
    const {
      trigger
    } = this.props

    return trigger ? React.cloneElement(trigger, {}, null) : <div className={'dtp'} />
  }
}

export { DateTimePicker }
