import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

export default class extends Component {
  render() {
    let inFuture = moment().isBefore(this.props.time);
    return (
      <span>{this.props.type} {inFuture ? "will be" : "was"} <Moment date={this.props.time} format="HH:mm" /></span>
    )
  }
}
