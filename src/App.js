import { useState } from 'react';
import { FormControl, Select, MenuItem } from "@material-ui/core";
import './App.css';

function App() {
  // React useState hook
  const [countries, setCountries] = useState(['USA', 'Malaysia', 'UK']);

  // React useEffect hook which calls itself automatically when this function is called OR depending on arguments passed
  // useEffect(() => {

  // })

  return (
    <div className="app">
      {/* Components */}
      {/* Title and Select input dropdown */}
      <h1>Covid-19-Tracker</h1>
      <FormControl className="app__dropdown">
        <Select>
          {/* 1. loop through all the countries that was pulled in from api service in useEffect hook */}
          {/* 2. return a MenuItem component for each country */}
          {/* JS code in HTML has to be in curly braces */}
          {countries.map(country => (
            <MenuItem value={country}>{country}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* 3 Infoboxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
