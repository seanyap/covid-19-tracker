// this file contains helper functions

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
