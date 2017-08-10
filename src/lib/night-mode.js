import React, { Component } from 'react';
import Moment from 'react-moment';
import "./night-mode.css";

export default class extends Component {
  render() {
    return (
      <div className="NightMode">
        You really shouldn't be surfing at night, Marine. <br />
        <br />
        Sunset was at <Moment date={this.props.sunset} format="HH:mm" />. <br />
        <br />
        Sunrise will be at <Moment date={this.props.sunrise} format="HH:mm" />.
      </div>
    )
  }
}
