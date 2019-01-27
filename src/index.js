import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { getMonthName } from "./utils";

// import styles from './styles.css'

class DateTimePicker extends Component {
  date = new Date();

  static propTypes = {
    trigger: PropTypes.node,
    hasRange: PropTypes.bool
  };

  static defaultProps = {
    trigger: null,
    hasRange: false
  };

  constructor(props) {
    super(props);

    const { trigger, hasRange } = this.props;

    this.state = {
      displayed: !trigger,
      currentMonth: getMonthName({ monthIndex: this.date.getMonth() }),
      nextMonth:
        hasRange && getMonthName({ monthIndex: this.date.getMonth() + 1 })
    };
  }

  renderDTP = () => {
    const { currentMonth, nextMonth } = this.state;
    return (
      <div className={"dtp"}>
        <div>
          <h3>{currentMonth}</h3>
        </div>
        {nextMonth && (
          <div>
            <h3>{nextMonth}</h3>
          </div>
        )}
      </div>
    );
  };

  toggleDisplayed = () => {
    const { displayed } = this.state;
    this.setState({ displayed: !displayed });
  };

  render() {
    const { trigger } = this.props;
    const { displayed } = this.state;

    return (
      <Fragment>
        {trigger && (
          <Fragment>
            {React.cloneElement(trigger, { onClick: this.toggleDisplayed })}
            {displayed && this.renderDTP()}
          </Fragment>
        )}
        {!trigger && this.renderDTP()}
      </Fragment>
    );
  }
}

export { DateTimePicker };
