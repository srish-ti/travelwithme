import React,{Component} from 'react';
import {View,Text,StyleSheet,} from 'react-native';
import {bindActionCreators} from 'redux';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {updateLocation,gpsData} from '../actions/index';

class Location extends Component{

  componentWillMount() {

    this.watchId=navigator.geolocation.watchPosition(
      (position) => {
        this.props.updateLocation(position.coords);
        this.props.gpsData(position.coords);
      },
      (error) =>alert(JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  onRegionChange(region) {
    this.props.updateLocation(region);
  }
  render() {
    return (
      <View style={styles.containerBox}>
        <MapView
          style={styles.map}
          region={this.props.location.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
        <MapView.Marker
          coordinate={{
            latitude:this.props.location.gps.lat,
            longitude:this.props.location.gps.long
          }}
          title={"Home"}
        />
        </MapView>
      </View>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    location:state.locationReducer
  }
}
const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({updateLocation,gpsData},dispatch)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  containerBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default connect(mapStateToProps,mapDispatchToProps)(Location);
