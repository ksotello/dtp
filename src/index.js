import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { getMonthName, daysInMonth, getYear } from "./utils";

import styles from './styles.css'

class Pykz extends Component {
  date = new Date();

  static propTypes = {
    trigger: PropTypes.node,
    dayCell: PropTypes.func,
    headerCell: PropTypes.func,
    hasRange: PropTypes.bool
  };

  static defaultProps = {
    trigger: null,
    dayCell: null,
    headerCell: null,
    hasRange: false
  };

  state = {
    displayed: !this.props.trigger,
    previousMonth: getMonthName({ monthIndex: this.date.getMonth() - 1 }),
    currentMonth: getMonthName({ monthIndex: this.date.getMonth() }),
    nextMonth:
      this.props.hasRange &&
      getMonthName({ monthIndex: this.date.getMonth() + 1 })
  };

  renderDates = month => {
    const { dayCell } = this.props;

    const dates = [];
    let index = 0;

    for (; index < daysInMonth({ month }); index++) {
      let currentDay = index + 1;
      const isCurrentDay = this.date.getDate() === currentDay;
      dates.push(
        <li
          key={currentDay}
          className={`${styles.pykz__date} ${
            isCurrentDay ? `${styles.pykz__highlighted}` : ""
          }`}
        >
          {(dayCell && dayCell({ currentDay, isCurrentDay })) || currentDay}
        </li>
      );
    }

    return dates;
  };

  renderPykz = () => {
    const { currentMonth, nextMonth, previousMonth } = this.state;
    const { headerCell } = this.props;
    const currentYear = this.date.getUTCFullYear();

    return (
      <div className={`${styles.pykz}`}>
        <div className={"pykz__currentMonth"}>
          <div className={`${styles.pykz__header}`}>
            <h3>
              {(headerCell &&
                headerCell({
                  currentMonth,
                  currentYear: getYear({
                    currentMonth: previousMonth,
                    nextMonth: currentMonth,
                    currentYear
                  })
                })) || (
                <Fragment>
                  {currentMonth}
                  {getYear({
                    currentMonth: previousMonth,
                    nextMonth: currentMonth,
                    currentYear
                  })}
                </Fragment>
              )}
            </h3>
          </div>
          <ul className={`${styles.pykz__dates}`}>{this.renderDates(currentMonth)}</ul>
        </div>
        {nextMonth && (
          <div className={"pykz__nextMonth"}>
            <div className={"pykz__header"}>
              <h3>
                {nextMonth} {getYear({ currentMonth, nextMonth, currentYear })}
              </h3>
            </div>
            <ul className={`${styles.pykz__dates}`}>{this.renderDates(nextMonth)}</ul>
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
            {displayed && this.renderPykz()}
          </Fragment>
        )}
        {!trigger && this.renderPykz()}
      </Fragment>
    );
  }
}

export { Pykz };
