import React, { Component } from "react";

const categories = [
  "Food",
  "School",
  "College",
  "Temple",
  "Sports",
  "Restaurant",
  "Hotel",
  "Travel",
  "Mall",
  "Cinema",
  "Sweet Shop"
];
class WikiInfo extends Component {
  state = {
    categories: []
  };

  render() {
    return (
      <select>
        {categories.map(category => (
          <option>{category}</option>
        ))}
      </select>
    );
  }
}

export default WikiInfo;
