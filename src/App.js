import { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
  // React useState hook --> state management
  // countries is an array that stores a list of objects which contain mappings of name -> country AND value -> country-iso2
  const [countries, setCountries] = useState([]);
  // keep track of current selected country from dropdown list; default worldwide
  const [country, setCountry] = useState("worldwide");
  // data based of current country
  const [countryInfo, setCountryInfo] = useState({});

  // init code
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  // React useEffect hook
  // code inside anonymous func will run only once when the component loads AND if there's additional state in hook arg
  useEffect(() => {
    // async -> send a request, wait for it in a non-blocking way, then do something with the info
    const getCountriesData = async () => {
      // pull data(request object) from api service end point
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json()) // convert res obj to json type
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States
            value: country.countryInfo.iso2, // US
          }));

          // call function to change state instead of using assignment operator
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  // this func is called by the event listener when the click event for the select element is triggered
  const onCountryChange = async (event) => {
    // get the value of the element that triggered the event
    const countryCode = event.target.value;

    // pull info from API service
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`; // determine which API endpoint to use

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data); // all of the data from the current country response
      });
  };
  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        {/* <--- Components ---> */}
        {/* Title and Select input dropdown */}
        <div className="app__header">
          <h1>Covid-19-Tracker</h1>

          <FormControl className="app__dropdown">
            {/* variant property is the look for the select box; value property is the value that the box display. we want the box to display the current selected country */}
            {/* onChange property is the event listener. we need to add event listener to this select element to keep track of selected country */}
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {/* 1. loop through all the countries that was pulled in from api service in useEffect hook */}
              {/* 2. return a MenuItem component for each country */}
              {/* JS code in HTML has to be in curly braces */}
              {countries.map((country) => (
                // value property is to assign a name to identify this particular element, when when it is selected you know which one
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Infoboxes */}
        <div className="app__stats">
          {/* 3 of the same React components but with different React PROPS passed into it to make each component unique */}
          {/* React components are SELF CLOSING */}
          <InfoBox
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new cases</h3>
          {/* Table */}
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
