import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

// customize configuration according to the options available on chartjs documentation
const options = {
  // dont want legend to display
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        // don't show y axis gridlines
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const casesTypeColors = {
  // this is a constant mappings of casesType: cases, recovered, and deaths to their individual assigned color
  cases: {
    hex: "#FB4443",
  },
  recovered: {
    hex: "#7DD71D",
  },
  deaths: {
    hex: "#CC1034",
  },
};

function LineGraph({ casesType = "cases" }) {
  // state
  const [data, setData] = useState({});

  // function to process data returned from API
  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;

    // process data to desired format
    for (let date in data[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  // init code
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        const chartData = buildChartData(data, casesType);
        setData(chartData);
      });
  }, [casesType]);

  return (
    <div>
      {/* data? is optional chaining feature. handles error and returns undefined if data does not exist. the original way to do this would be data && data.length > 0 */}
      {data?.length > 0 && (
        <Line
          options={options} // configurations for Line. read Chart.js documentation for more info
          data={{
            datasets: [
              {
                backgroundColor: casesTypeColors[casesType].hex,
                // borderColor: casesTypeColors[casesType].hex,
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
