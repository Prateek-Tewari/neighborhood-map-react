import React, { Component } from "react";
import VenueList from "./VenueList";
//referred walkthrough of Forrest for SideBar stuffs: https://www.youtube.com/watch?v=lDVaZY0aG2w&t=0s&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=7

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

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: [],
      categories: []
    };
  }
  //handles Filtering of Markers and ListView based on Query in search box
  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };
  //The change in search query is monitored and matched here
  handleChange = event => {
    this.setState({ query: event.target.value });

    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };
  //renders the sidebar which has all the list of food stall available in Salem, India
  render() {
    return (
      <div className="sideBar">
        <select
          id="select"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <option value="Select">Choose an option</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* <input
          type={"select"}
          tabIndex={0}
          id="select"
          placeholder="Select Type of Place"
          onChange={this.handleChange}
        /> */}
        <VenueList
          {...this.props}
          venues={this.handleFilterVenues()}
          handleListItem={this.props.handleListItem}
        />
        <div style={{ background: "white", marginTop: "10px" }}>
          <img
            width="200px"
            src="https://ss0.4sqi.net/img/poweredByFoursquare/poweredby-one-color-cdf070cc7ae72b3f482cf2d075a74c8c.png"
            alt="Powered by Foursquare"
          />
          <p style={{ fontSize: "12px", fontStyle: "italic", color: "red" }} />
        </div>
      </div>
    );
  }
}
export default SideBar;
