/* Making all the necessary imports*/
import React, { Component } from "react";
import VenueList from "./VenueList";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: []
    };
  }
  //Filtering Markers on Map
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
  //Renders the SideMenu, which populates the list of first 10 schools of Dehradun, India
  render() {
    return (
      <div className="sideBar">
        <input
          type={"search"}
          tabIndex={0}
          id="search"
          placeholder="Search Places"
          onChange={this.handleChange}
        />
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
        </div>
      </div>
    );
  }
}
export default SideBar;
