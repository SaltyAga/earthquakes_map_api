import React, { Component } from 'react';

class ShowMap extends Component {
    constructor(props) {
      super(props);
    
    }
  
    onScriptLoad() {
      const map = new window.google.maps.Map(
        document.getElementById(this.props.id),
        this.props.options);
      this.props.onMapLoad(map)
    }
  
    componentDidMount() {
      if (!window.google) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&language=en`;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        // Below is important. 
        //We cannot access google.maps until it's finished loading
        s.addEventListener('load', e => {
          this.onScriptLoad()
        })
      } else {
        this.onScriptLoad()
      }
    }

    componentDidUpdate() {
        if (!window.google) {
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&language=en`;
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
          // Below is important. 
          //We cannot access google.maps until it's finished loading
          
          s.addEventListener('load', e => {
            this.onScriptLoad()
          })
        } else {
          this.onScriptLoad()
        }
      }
  
    render() {
      return (
        <div style={{ width: 500, height: 500 }} id={this.props.id} />
      );
    }
  }

export default ShowMap;