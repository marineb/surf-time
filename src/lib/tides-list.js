import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import TideItem from './tide-item';
import GeocodeLocation from './geocode-location';
import './tides-list.css';

import { getTides, getSun } from './util'

class TidesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    getTides()
      .then(({heights, lat, long}) => this.setState({ heights, lat, long}));
    getSun()
      .then(d => this.setState({sunrise: d.sunrise, sunset: d.sunset}))
  }
  render() {
    let heights = this.state.heights || [];
    return (
      <div className="TidesList">
        <h2 className="TidesList__date">Tides for <Moment format="D MMMM YYYY" /></h2>
        {this.state.lat && this.state.long &&
          <GeocodeLocation lat={this.state.lat} long={this.state.long} />
        }
        {heights.length > 0 &&
          this.state.heights.map((d, i) => {
           return <TideItem key={i} time={d.date} height={d.height} unit='m' tide={d.type} /> 
          })}
      </div>
    )
  }
}

export default TidesList;
