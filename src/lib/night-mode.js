import React, { Component } from 'react';
import Moment from 'react-moment';
import "./night-mode.css";

export default class extends Component {
  render() {
    return (
      <div className="NightMode">
        Sunrise is at <Moment date={this.props.sunrise} format="HH:mm" />.
        You really shouldn't be surfing at night, Marine.
      </div>
    )
  }
}
