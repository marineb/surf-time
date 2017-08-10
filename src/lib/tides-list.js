import React, { Component } from 'react';
import TideItem from './tide-item';
import SunIcon from './sun-icon';
import './tides-list.css';

class TidesList extends Component {
  render() {
    let items = this.props.items || [];
    return (
      <div className="TidesList">
        {items.length > 0 &&
          items.map((d, i) => {
            if (d.type === 'sunrise' || d.type === 'sunset') {
              return <SunIcon key={i} type={d.type} time={d.date} />
            } else {
             return <TideItem key={i} time={d.date} height={d.height} unit='m' tide={d.type} /> 
            }
          })}
      </div>
    )
  }
}

export default TidesList;
