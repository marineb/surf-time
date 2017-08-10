import moment from 'moment';

const STEP = moment.duration(90, 'minutes') / 1000;
const ONE_DAY = moment.duration(1, 'day') / 1000;
const KEY = '74e28dc2-db50-449d-bdaf-58ccaa98cf30';

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

export function getTides(lat, lng) {
  const START = moment().unix();
  
  return fetch(`https://www.worldtides.info/api?extremes&heights&step=${STEP}&lat=${lat}&lon=${lng}&start=${START}&length=${ONE_DAY}&key=${KEY}&datum=LAT`)
    .then(r => r.json())
    .then(data => {
      return {
        heights: data.heights.concat(data.extremes).sort(sortByDate),
        lat: data.responseLat,
        lng: data.responseLon
      } 
    });
}

export function getSun(lat, lng) {
  return fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
    .then(r => r.json())
    .then(({ results: { sunrise, sunset }}) => ({sunrise, sunset}));
}

export function combineSunAndTides([{ heights, lat, lng }, { sunrise, sunset }]) {
  let suntimes = [
    {date: sunrise, type: 'sunrise'},
    {date: sunset, type: 'sunset'}
  ];
  heights = heights
    .concat(suntimes)
    .sort(sortByDate)
    .filter(t => {
      let time = moment(t.date);
      if (time.isBefore(sunrise) || time.isAfter(sunset)) {
        return false;
      }
      return time;
    });
  return { heights, tideLat: lat, tideLng: lng };
}
