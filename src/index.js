import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { getMonthName, daysInMonth } from "./utils";

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
        <div className={"dtp__currentMonth"}>
          <div className={"dtp__header"}>
            <h3>
              {currentMonth} {this.date.getUTCFullYear()}
            </h3>
          </div>
          <div className={"dtp__dates"}>{this.renderDates(currentMonth)}</div>
        </div>
        {nextMonth && (
          <div className={"dtp__nextMonth"}>
            <div className={"dtp__header"}>
              <h3>{nextMonth}</h3>
            </div>
            <div className={"dtp__dates"}>{this.renderDates(nextMonth)}</div>
          </div>
        )}
      </div>
    );
  };

  renderDates = month => {
    const dates = [];
    let index = 0;

    for (; index < daysInMonth(month); index++) {
      let currentDay = index + 1;
      dates.push(
        <div
          key={index}
          className={`dtp__date ${
            this.date.getDate() === currentDay ? "dtp__date--highlighted" : ""
          }`}
        >
          {currentDay}
        </div>
      );
    }

    return dates;
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
