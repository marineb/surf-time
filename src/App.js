import React, { Component } from 'react';

import TidesList from './lib/tides-list';
import DayAndPlace from './lib/day-and-place';
import GeocodeLocation from './lib/geocode-location';
import NightMode from './lib/night-mode';
import SurfGif from './lib/surf-gif';
import Footer from './lib/footer';

import { getTides, getSun, combineSunAndTides } from './lib/util';

import BodyClassName from 'react-body-classname';
import moment from 'moment';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        label: "Paris, France"
      },
      lat: 48.8566101,
      lng: 2.3514992,
    };
    
    this.updateTides(this.state.lat, this.state.lng);
  }
  
  onLocationChange(location) {
    if (location) {
      let { value } = location;
      let [ lat, lng ] = value.split('|');
      this.setState({value: location, lat, lng});
      this.updateTides(lat, lng);
    } else {
      this.setState({value: null, lat: null, lng: null});
    }
  }
  
  checkSun([ tides, { sunrise, sunset }]) {
    let now = moment();
    if (now.isBefore(sunrise) || now.isAfter(sunset)) {
      this.setState({ sunrise })
      throw new Error('night time');
    } else {
      return [tides, { sunrise, sunset }];
    }
  }
  
  updateTides(lat, lng) {
    Promise.all([getTides(lat, lng), getSun(lat, lng)])
      .then(this.checkSun.bind(this))
      .then(combineSunAndTides)
      .then(data => this.setState(data))
      .then(() => this.setState({nightMode: false}))
      .catch(e => {
        if (e.message === 'night time') {
          this.setState({nightMode: true});
        } else {
          throw e;
        }
      });
  }

  render() {
    let { lat, lng, tideLat, tideLng } = this.state;
    let latIsOff = Math.abs(Number(lat) - Number(tideLat)) > 0.5;
    let longIsOff = Math.abs(Number(lng) - Number(tideLng)) > 0.5;
    let notNearAShore = latIsOff && longIsOff;
    
    return (
      <BodyClassName className={this.state.nightMode ? 'night-mode' : ''}>
        <div className="l-center">
          
          <SurfGif />
          
          <h1 className="main-heading">
            When should<br />Marine surf?
          </h1>
          
          {notNearAShore && lat && lng && !this.state.nightMode &&
            <GeocodeLocation lat={this.state.tideLat} lng={this.state.tideLng} location={this.state.value.label} />
          }
          
          {this.state.nightMode ?
            <NightMode sunrise={this.state.sunrise} />
            :
            lat && lng && <TidesList items={this.state.heights} />
          }
          
          <DayAndPlace
            onChange={this.onLocationChange.bind(this)}
            value={this.state.value} />
          
          
          <Footer />
          
        </div>
      </BodyClassName>
    );
  }
}

export default App;
