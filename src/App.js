/* Making all the necessary imports*/
import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";
import fourSquare from "./API/";
import SideBar from "./components/SideBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      //center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({
      markers: Object.assign(this.state.markers, markers)
    });
  };
  /*Attribution - https://github.com/udacity/ud864/blob/master/Project_Code_3_WindowShoppingPart1.html
  Markers are handled along with the venues selected in ListView*/
  handleMarker = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    //Object.assign helps Copying Marker into the state. Referred from various resources, mainly StackOverflow.
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    fourSquare.getVenue(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
    });
  };
  //Venue list is filtered here
  handleListItem = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarker(marker);
  };

  //Marker Positions are fetched Asynchronously from FourSquare
  componentDidMount() {
    fourSquare
      .search({
        near: "Dehradun, IN", //my place :)
        query: "School", //This is , what my place is famous for
        limit: 10
      })
      .then(results => {
        const { venues } = results.response;
        // const { center } = results.response.geocode.feature.geometry; //
        //console.log(center);
        //Destructuring the constructor with this syntax
        const markers = venues.map(venue => {
          //console.log(venue.location.lat);
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id
          };
        });
        // console.log(center);
        this.setState({ venues, markers });
      })
      .catch(function(err) {
        alert(
          `Error occurred while fetching data from server, app may not work correctly: ${err}`
        );
      });
  }
  render() {
    return (
      <div className="App" role="application">
        <SideBar {...this.state} handleListItem={this.handleListItem} />
        <Map
          role="main"
          {...this.state}
          handleMarker={this.handleMarker}
          closeAllMarkers={this.closeAllMarkers}
        />
      </div>
    );
  }
}
export default App;
