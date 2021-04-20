import React from "react"; // to use JSX
import numeral from "numeral"; // to format numbers
import { Circle, Popup } from "react-leaflet";

// this file contains helper functions

const casesTypeColors = {
  // this is a constant mappings of casesType: cases, recovered, and deaths to their individual assigned color
  cases: {
    hex: "#CC1034",
  },
  recovered: {
    hex: "#7DD71D",
  },
  deaths: {
    hex: "#FB4443",
  },
};

// function expression
export const sortData = (data) => {
  // split the data into individual items and put them in sortedData array
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1; // -1 represents false
    } else {
      return 1; // 1 represents true
    }
  });
  return sortedData;
};

// format the stats numbers to look good when displayed
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") =>
  // iterate through all countries in data
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={(country.cases / country.todayCases) * 300}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
