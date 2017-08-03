import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import TideItem from './tide-item';
import GeocodeLocation from './geocode-location';
import './tides-list.css';

const KEY = '74e28dc2-db50-449d-bdaf-58ccaa98cf30';
const PARIS_LAT = '48.8566';
const PARIS_LONG = '2.3522';
const LE_T_LAT = '46.45108841932595';
const LE_T_LONG = '2.2098490391466323';
const ONE_DAY = moment.duration(1, 'day') / 1000;

const LAT = LE_T_LAT;
const LONG = LE_T_LONG;
// const LAT = PARIS_LAT;
// const LONG = PARIS_LONG;

function sortByDate(a, b) {
  let m = moment(a.date);
  if (m.isBefore(b.date)) {
    return -1;
  } else if (m.isAfter(b.date)) {
    return 1;
  } else {
    return 0;
  }
}

class TidesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const START = moment().unix();
    fetch(`https://www.worldtides.info/api?extremes&heights&lat=${LAT}&lon=${LONG}&start=${START}&length=${ONE_DAY}&key=${KEY}&datum=LAT`)
      .then(r => r.json())
      .then(data => this.setState({heights: data.heights.sort(sortByDate), lat: data.responseLat, long: data.responseLon}));
  }
  render() {
    let heights = this.state.heights || [];
    return (
      <div className="TidesList">
        <h1>Tides for <Moment format="D MMMM YYYY" /></h1>
        {this.state.lat && this.state.long &&
          <GeocodeLocation lat={this.state.lat} long={this.state.long} />
        }
        {heights.length > 0 &&
          this.state.heights.map((d, i) => <TideItem key={i} time={d.date} height={(d.height * 3.37).toFixed()} />)}
      </div>
    )
  }
}

export default TidesList;
