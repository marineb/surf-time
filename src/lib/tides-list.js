import React, { Component } from 'react';
import moment from 'moment';

import TideItem from './tide-item';
import './tides-list.css';

const KEY = '74e28dc2-db50-449d-bdaf-58ccaa98cf30';
const PARIS_LAT = '48.8566';
const PARIS_LONG = '2.3522';
const ONE_DAY = moment.duration(1, 'day') / 1000;

class TidesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const START = moment().unix();
    fetch(`https://www.worldtides.info/api?heights&lat=${PARIS_LAT}&lon=${PARIS_LONG}&start=${START}&length=${ONE_DAY}&key=${KEY}`)
      .then(r => r.json())
      .then(data => this.setState({heights: data.heights}));
  }
  render() {
    let heights = this.state.heights || [];
    return (
      <div className="TidesList">
        {heights.length > 0 &&
          this.state.heights.map((d, i) => <TideItem key={i} date={d.date} height={d.height} />)}
      </div>
    )
  }
}

export default TidesList;
