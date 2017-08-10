import React, { Component } from 'react';
import Moment from 'react-moment';

export default class extends Component {
  render() {
    return (
      <span>{this.props.type} <Moment date={this.props.time} format="HH:mm" /></span>
    )
  }
}
