import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// import styles from './styles.css'

class DateTimePicker extends Component {
  static propTypes = {
    trigger: PropTypes.node
  };

  static defaultProps = {
    trigger: null
  };

  constructor(props) {
    super(props);
    this.state = {
      displayed: !props.trigger
    };
  }

  renderDTP = () => <div className={"dtp"} />;

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
