import React from "react";
import numeral from "numeral";
import "./Table.css";

// destructure the props(an object) and get countries key
function Table({ countries }) {
  return (
    <div className="table">
      {/* for every country in countries, call anonynous function and do some action */}
      {/* destructure country and get keys: country and cases */}
      {countries.map(({ country, cases, countryInfo }) => (
        <tr>
          <td
            style={{
              backgroundImage: `url(${countryInfo.flag})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              height: "30px",
              width: "30px",
              marginBottom: "10px",
            }}
          ></td>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
