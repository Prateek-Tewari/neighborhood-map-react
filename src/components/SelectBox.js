/* Making all the necessary imports*/
import React, { Component } from "react";

class SelectBox extends Component {
  categories = [
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
  state = {
    category: ""
  };
  render() {
    //console.log(this.props.categories);

    return (
      <select id="select" value={this.value}>
        <option value="Choose" key="Choose">
          Choose an option
        </option>
        {this.categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    );
  }
}

export default SelectBox;
