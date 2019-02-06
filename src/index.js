import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { getMonthName, daysInMonth } from "./utils";

// import styles from './styles.css'

class Pykz extends Component {
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

  renderpykz = () => {
    const { currentMonth, nextMonth } = this.state;
    return (
      <div className={"pykz"}>
        <div className={"pykz__currentMonth"}>
          <div className={"pykz__header"}>
            <h3>
              {currentMonth} {this.date.getUTCFullYear()}
            </h3>
          </div>
          <ul className={"pykz__dates"}>{this.renderDates(currentMonth)}</ul>
        </div>
        {nextMonth && (
          <div className={"pykz__nextMonth"}>
            <div className={"pykz__header"}>
              <h3>{nextMonth}</h3>
            </div>
            <ul className={"pykz__dates"}>{this.renderDates(nextMonth)}</ul>
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
        <li
          key={currentDay}
          className={`pykz__date ${
            this.date.getDate() === currentDay ? "pykz__date--highlighted" : ""
          }`}
        >
          {currentDay}
        </li>
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
            {displayed && this.renderpykz()}
          </Fragment>
        )}
        {!trigger && this.renderpykz()}
      </Fragment>
    );
  }
}

export { Pykz };
