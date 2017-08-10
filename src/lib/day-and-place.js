import React, { Component } from 'react';
import Moment from 'react-moment';
import Select from 'react-select';

import './day-and-place.css';

const GEOCODE_KEY = 'b8041ad314074a85800db4fbe9ff65d3';

function loadOptions(input) {
  return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${GEOCODE_KEY}`)
    .then(r => r.json())
    .then(({ results }) => {
      let options = results.map(d => {
        return {
          label: `${d.formatted}`,
          value: `${d.geometry.lat}|${d.geometry.lng}`
        };
      });
      return { options };
    });
}

export default class extends Component {
  render() {
    return (
      <div className="CitySelect">
        <h2 className="CitySelect__date">
          Tides for <Moment format="D MMMM YYYY" />
        </h2>
        <Select.Async
          className="CitySelect__dropdown"
          name="city-lookup"
          value={this.props.value}
          loadOptions={loadOptions}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
};
