import React from "react";
import "./Table.css";

// destructure the props(an object) and get countries key
function Table({ countries }) {
  return (
    <div className="table">
      {/* for every country in countries, call anonynous function and do some action */}
      {/* destructure country and get keys: country and cases */}
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>{cases}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
