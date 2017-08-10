import React, { Component } from 'react';
import './geocode-location.css';

const GEOCODE_KEY = 'b8041ad314074a85800db4fbe9ff65d3';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._isCancelled = false;
  }
  componentWillReceiveProps({ lat, lng }) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=${GEOCODE_KEY}`)
      .then(r => r.json())
      .then(d => {
        if (!this._isCancelled) {
          this.setState({
            address: `${d.results[0].components.city || d.results[0].components.village}, ${d.results[0].components.country}`
          })
        }
      });
  }
  componentWillUnmount() {
    this._isCancelled = true;
  }
  render() {
    if (this.state.address) {
      return (
        <h3 className="GeocodeLocation">
          {this.props.location} doesn't seem to be near a shore. Here are the tides for {this.state.address} instead.
        </h3>
      )
    } else {
      return null;
    }
  }
}
