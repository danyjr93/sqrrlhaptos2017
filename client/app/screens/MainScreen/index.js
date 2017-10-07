import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Platform} from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../constants';
import api from '../../api';



class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {markers: []};
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((response) => {
      this.setState({
        currentLocation: {
          latitude: parseFloat(response.coords.latitude) ,
          longitude: parseFloat(response.coords.longitude)
        }
      })

      api.getLocations().then((response) => {
        this.setState({markers: response.data});
      });
    });

  }

  watchID: ?number = null;

  static navigationOptions = () => ({
    title: "Democracity",
    headerStyle: {
      height: Platform.OS === "android"? 54 + STATUS_BAR_HEIGHT: 54,
      backgroundColor: "#4290FA"
    },
    headerTitleStyle: {
      marginTop: Platform.OS === "android"? STATUS_BAR_HEIGHT: 0,
      color: 'white'
    },
    headerLeft:  <View/>
  });


  render(){
    console.log("Current location", this.state.currentLocation );
    return(
      <View style ={styles.container}>
      {
        (this.state.currentLocation) &&  <MapView
            style={styles.map}
            region={{
              latitude: this.state.currentLocation.latitude,
              longitude: this.state.currentLocation.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            >
            {
              (this.state.markers) && this.state.markers.map((marker, i) => (
              <MapView.Marker
                key = {i}
                coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
                title={"Some title"}
              />
              ))
            }
            {
              (this.state.currentLocation) && <MapView.Marker
                key = {4523453}
                coordinate = {{latitude: this.state.currentLocation.latitude, longitude: this.state.currentLocation.longitude}}
                title = {"You are here"}
              />

            }
          </MapView>
      }
      </View>
    )

  }
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 75,
    width: 75,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    left: 80,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});
