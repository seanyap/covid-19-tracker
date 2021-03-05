import { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from "@material-ui/core";
import InfoBox from './InfoBox';
import './App.css';

function App() {
  // React useState hook
  // countries is an array that stores a list of objects which contain mappings of name -> country AND value -> country-iso2
  const [countries, setCountries] = useState([]);
  // keep track of current selected country from dropdown list; default worldwide
  const [country, setCountry] = useState("worldwide");

  // React useEffect hook 
  // code inside anonymous func will run only once when the component loads AND if there's additional state in hook arg
  useEffect(() => {
    // async -> send a request, wait for it in a non-blocking way, then do something with the info
    const getCountriesData = async () => {
      // pull data(request object) from api service end point 
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())  // convert res obj to json type
        .then(data => {
          const countries = data.map(country => ({
            name: country.country, // United States
            value: country.countryInfo.iso2 // US
          }));
          
          // call function to change state instead of using assignment operator
          setCountries(countries);
        })
    }

    getCountriesData();
  }, []);

  // this func is called by the event listener when the click event for the select element is triggered
  const onCountryChange = (event) => {
    // get the value of the element that triggered the event
    const countryCode = event.target.value;

    setCountry(countryCode);
  };

  return (
    <div className="app">
      {/* Components */}

      {/* Title and Select input dropdown */}
      <div className="app__header">
        <h1>Covid-19-Tracker</h1>
        <FormControl className="app__dropdown">
          {/* variant property is the look for the select box; value property is the value that the box display. we want the box to display the current selected country */}
          {/* onChange property is the event listener. we need to add event listener to this select element to keep track of selected country */}
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>

            {/* 1. loop through all the countries that was pulled in from api service in useEffect hook */}
            {/* 2. return a MenuItem component for each country */}
            {/* JS code in HTML has to be in curly braces */}
            {countries.map(country => (
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
        <InfoBox title="Coronavirus cases" cases={1000} total={2000} />
        <InfoBox title="Recovered" cases={1000} total={2000} />
        <InfoBox title="Deaths" cases={1000} total={2000} />
      </div>
          
      {/* Table */}

      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
