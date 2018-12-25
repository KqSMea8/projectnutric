import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles'; 

 

export class MapContainer extends Component {
  
  render() {
    
  const { classes } = this.props;
  const style = {
  width: 470,
  height: 350
}
    return (
    <div  style={{marginLeft: 40}}>   
      <h2> Mi Consultorio</h2> 
          <Map 
            style={style}
            google={this.props.google} zoom={14}>
            <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
            <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
          </Map>
 
    </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBuFKh_GG-UxqG9ztjL0vmsOzjDY6zU9q8')
})(MapContainer)