import moment from 'moment';

const ONE_DAY = moment.duration(1, 'day') / 1000;
const KEY = '74e28dc2-db50-449d-bdaf-58ccaa98cf30';

const PARIS_LAT = '48.8566';
const PARIS_LONG = '2.3522';
const LE_T_LAT = '46.45108841932595';
const LE_T_LONG = '2.2098490391466323';

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

export function getTides() {
  const START = moment().unix();
  
  return fetch(`https://www.worldtides.info/api?extremes&heights&lat=${LAT}&lon=${LONG}&start=${START}&length=${ONE_DAY}&key=${KEY}&datum=LAT`)
    .then(r => r.json())
    .then(data => {
      return {
        heights: data.heights.concat(data.extremes).sort(sortByDate),
        lat: data.responseLat,
        long: data.responseLon
      } 
    });
}

export function getSun() {
  return fetch(`https://api.sunrise-sunset.org/json?lat=${LAT}&lng=${LONG}&formatted=0`)
    .then(r => r.json())
    .then(({sunrise, sunset}) => ({sunrise, sunset}));
}

export function getData() {
  Promise.all([getTides(), getSun()])
    .then((tides, sun) => {
      let suntimes = [
        {date: sun.sunrise, type: 'sunrise'},
        {date: sun.sunset, type: 'sunset'}
      ];
      let heights = tides.heights
        .concat(tides.extremes, suntimes)
        .sort(sortByDate)
        .filter(t => {
          let time = moment(t.date);
          if (time.isBefore(sun.sunrise) || time.isAfter(t.date)) {
            return false;
          }
          return time;
        });
      console.log(heights);
      return { heights };
    });
}
