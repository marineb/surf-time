import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export default class extends Component {
  render() {
    return (
      <div className="TideItem">
        <Moment date={this.props.time} format="DD/MM/YYYY"/> | {this.props.height}
      </div>
    )
  }
}
