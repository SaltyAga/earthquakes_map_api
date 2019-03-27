import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ShowMap from './ShowMap';


let YEAR;
let MONTH;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      year: '',    
      month: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = e => { 
    YEAR = this.state.year;
    MONTH = this.state.month;
    e.preventDefault();
    axios
      .get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${YEAR}-${MONTH}-01&endtime=${YEAR}-${MONTH}-30&minmagnitude=3`)
      .then(res => {
        this.setState({
          result: res.data.features,
        })
        console.log(res);
      });
      
    }

  render() {
    return (
      <div className="App">
        <h1>Earthqakes's map</h1>
        <SearchBar 
          onSubmit={this.handleSubmit} 
          onChange={this.handleChange}  
          valueYear={this.state.year}
          valueMonth={this.state.month}
         />
         <ShowMap id="myMap"
            options={{
              center: { lat: 51.923116, lng: 4.467197 },
              zoom: 5
            }}
            onMapLoad={map => {
              let colors = (mag) => {
                return (
                  mag > 8 ? 'ff3366' : 
                  (mag <= 8 && mag > 7) ? 'ff6633' :
                  (mag <= 7 && mag > 6) ? 'FFCC33' :
                  (mag <= 6 && mag > 5) ? '33FF66' :
                  (mag <= 5 && mag > 4) ? '3366FF' :
                  'CC33FF'
                )
              }
              
      
              let marker = this.state.result.length ? 
              this.state.result.map(coordinate =>
                {
                  {
                    new window.google.maps.Marker({
                      position: { lat: coordinate.geometry.coordinates[1], lng: coordinate.geometry.coordinates[0] },
                      map: map,
                      title: coordinate.properties.place,
                      icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${colors(coordinate.properties.mag)}`,
                    })
                    
                  }
               }) : '';
              }
               
            } 
        />
      </div>
    );
  }
}

export default App;
