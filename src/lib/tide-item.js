import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export default class extends Component {
  render() {
    return (
      <div className="TideItem">
        <Moment date={this.props.time} format="HH:mm"/> | <em>{this.props.height} ft</em>
      </div>
    )
  }
}
