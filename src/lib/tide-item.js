import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import './tide-item.css';
import LowTideIcon from './low-tide-icon';
import HighTideIcon from './high-tide-icon';

export default class extends Component {
  render() {
    let icon;
    switch(this.props.tide) {
      case 'High':
        icon = <HighTideIcon />;
        break;
      case 'Low':
        icon = <LowTideIcon />;
        break;
      default:
        icon = '';
        break;
    }
    let unit = this.props.unit || 'm';
    let height;
    if (unit === 'ft') {
      height = this.props.height * 3.37;
    } else {
      height = this.props.height
    }
    return (
      <div className="TideItem">
        <Moment date={this.props.time} format="HH:mm"/> {icon} <em>{height.toFixed()} {unit}</em>
      </div>
    )
  }
}
