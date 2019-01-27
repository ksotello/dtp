import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { getMonthName } from "./utils";

// import styles from './styles.css'

class DateTimePicker extends Component {
  date = new Date();

  static propTypes = {
    trigger: PropTypes.node
  };

  static defaultProps = {
    trigger: null
  };

  constructor(props) {
    super(props);
    this.state = {
      displayed: !props.trigger,
      currentMonth: getMonthName(this.date.getMonth())
    };
  }

  renderDTP = () => {
    const { currentMonth } = this.state;
    return (
      <div className={"dtp"}>
        <h3>{currentMonth}</h3>
      </div>
    );
  }

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
