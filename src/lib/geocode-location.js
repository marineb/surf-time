import React, { Component } from 'react';
import './geocode-location.css';

const GEOCODE_KEY = 'b8041ad314074a85800db4fbe9ff65d3';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.props.lat}%2C${this.props.long}&key=${GEOCODE_KEY}`)
      .then(r => r.json())
      .then(d => this.setState({address: `${d.results[0].components.city || d.results[0].components.village}, ${d.results[0].components.country}`}));
  }
  render() {
    return <h3 className="GeocodeLocation">in {this.state.address}</h3>
  }
}
