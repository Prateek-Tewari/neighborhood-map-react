/* Making all the necessary imports*/
import React, { Component } from "react";
import ListView from "./ListView";

//Rendering a list here with the help of Foursquare API
class VenueList extends Component {
  render() {
    return (
      <ol className="venueList">
        {this.props.venues &&
          this.props.venues.map((venue, idx) => (
            <ListView
              key={idx}
              {...venue}
              handleListItem={this.props.handleListItem}
            />
          ))}
      </ol>
    );
  }
}
export default VenueList;
