import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Platform, ToastAndroid, Modal, Button, TextInput} from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../constants';
import api from '../../api';
import FAB from 'react-native-fab'
import {PRIMARY_COLORS} from 'react-native-material-design';
import Geocoder from 'react-native-geocoding';

const styleArray = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff4400"
            },
            {
                "saturation": -68
            },
            {
                "lightness": -4
            },
            {
                "gamma": 0.72
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#0077ff"
            },
            {
                "gamma": 3.1
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#44ff00"
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -64
            },
            {
                "hue": "#ff9100"
            },
            {
                "lightness": 16
            },
            {
                "gamma": 0.47
            },
            {
                "weight": 2.7
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": -48
            },
            {
                "hue": "#ff5e00"
            },
            {
                "gamma": 1.2
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#00ccff"
            },
            {
                "gamma": 0.44
            },
            {
                "saturation": -33
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#007fff"
            },
            {
                "gamma": 0.77
            },
            {
                "saturation": 65
            },
            {
                "lightness": 99
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "gamma": 0.11
            },
            {
                "weight": 5.6
            },
            {
                "saturation": 99
            },
            {
                "hue": "#0091ff"
            },
            {
                "lightness": -86
            }
        ]
    }
]

class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {markers: [], modalVisible: false, buttonSign: "+"};
    console.log(PRIMARY_COLORS);
    Geocoder.setApiKey("AIzaSyDRXXn7Zte6C5fWcSxpQJA7A-3_AwG0hmI"); // use a valid API key

  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((response) => {
      console.log(response);
      this.setState({
        currentLocation: {
          latitude: parseFloat(response.coords.latitude) ,
          longitude: parseFloat(response.coords.longitude),
          latitudeDelta: parseFloat(0.015),
          longitudeDelta: parseFloat( 0.0121)
        }
      })
    });

      api.getLocations().then((response) => {
        this.setState({markers: response.data, originalMarkers: response.data});
      });

      // Geocoder.getFromLatLng(marker.latitude, marker.longitude).then(
      //         json => {
      //             var address_component = json.results[0].address_components[0];
      //               var markers = this.state.markers;
      //               markers[i].name = address_component.long_name;
      //               this.setState({markers});
      //               return address_component.long_name;
      //               },
      //                 error => {
      //                   var markers = this.state.markers;
      //                   markers[i].name = "Name not found";
      //                   this.setState({markers});
      //                     return "Name not found";
      //               }
      // )
}

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
    var newLocation = this.state.newLocation;
    const { navigate } = this.props.navigation;

    return(
      <View style ={styles.container}>
      {
        (this.state.newLocation) && <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
            <View style={{marginTop: 60, flexDirection: 'column', width: '100%', alignItems: 'center'}}>
              <View>
                <Text style = {{marginBottom: 10}}>What is your suggestion?</Text>
                <Text>Description</Text>
                <TextInput
                  style={{height: 40, borderColor: 'white', borderWidth: 1}}
                  onChangeText={(description) => {
                    var newLocation = this.state.newLocation;
                    newLocation.description = description;
                    this.setState({newLocation: newLocation})
                  }}
                  value={newLocation? newLocation.description: ""}
                  />
                <Text>Justification</Text>
                <TextInput
                  style={{height: 40, borderColor: 'white', borderWidth: 1}}
                  onChangeText={(justification) => {
                    var newLocation = this.state.newLocation;
                    newLocation.justification = justification;
                    this.setState({newLocation: newLocation})
                  }}
                  value={newLocation? newLocation.justification: ""}
                  />
                <View style = {{flexDirection: "row", justifyContent: 'space-between'}} >

                <View style = {{marginTop: 10, width: '40%', right: 15}}>
                  <Button style = {{backgroundColor: '#ff5722', top: 20}} title = {"Cancel"}  onPress = {() => { this.setState({modalVisible: !this.state.modalVisible, newLocation: null})}} />
                </View>

                <View style = {{marginTop: 10, width: '40%', left: 15}}>
                <Button style = {{backgroundColor: '#ff5722'}} title = {"Save"}  onPress = {() => {
                  var newLocation = this.state.newLocation;
                  if(newLocation.justification && newLocation.description){
                    var locationObject = {
                        latitude: newLocation.latitude,
                        longitude: newLocation.longitude,
                        suggestion: {
                             description: newLocation.description,
                             justification: newLocation.justification
                        }
                    }
                    console.log("location object", locationObject)
                    api.saveLocaion(locationObject).then((response) => {console.log("after save", response)});
                    api.getLocations().then((response) => {
                      console.log("Response from api", response);
                      this.setState({markers: response.data, originalMarkers: response.data, newLocation: null});
                    });

                  }else{
                    api.saveLocaion({latitude: newLocation.latitude , longitude: newLocation.longitude}).then((response) => {console.log("after save", response)});
                    api.getLocations().then((response) => {

                      this.setState({markers: response.data, originalMarkers: response.data, newLocation: null});
                    });
                  }
                  this.setState({modalVisible: !this.state.modalVisible})
                }} />
                </View>


                </View>
              </View>
            </View>
        </Modal>
      }

      {
        (this.state.currentLocation) &&  <MapView
            customMapStyle = {styleArray}
            style={styles.map}
            onPress = {(event) => {
              console.log("recordTouch", this.state.recordTouch);
              if(this.state.recordTouch){
                var newLocation = {latitude: event.nativeEvent.coordinate.latitude, longitude: event.nativeEvent.coordinate.longitude};
                this.setState({recordTouch: false, modalVisible: true, buttonSign: "+", newLocation: newLocation});
              }
            }}

            onRegionChangeComplete = { (event) => {
              console.log(event.nativeEvent);
              this.setState({
                currentLocation: {
                  latitude: parseFloat(event.latitude) ,
                  longitude: parseFloat(event.longitude),
                  latitudeDelta : parseFloat(event.latitudeDelta),
                  longitudeDelta: parseFloat(event.longitudeDelta)
                }
              })
            }}

            showsUserLocation = {true}
            showsBuildings = {true}
            followsUserLocation = {false}
            moveOnMarkerPress = {false}
            region={{
              latitude: this.state.currentLocation.latitude,
              longitude: this.state.currentLocation.longitude,
              latitudeDelta: this.state.currentLocation.latitudeDelta,
              longitudeDelta: this.state.currentLocation.longitudeDelta,
            }}
            >
            {
              (this.state.markers) && this.state.markers.map((marker, i) => (
              <MapView.Marker
                key = {i}
                coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
                title={"View suggested projects"}
                onPress = {(event) => {
                    navigate('Suggestions', marker);
                  console.log("Pressed");
                  console.log("marker", marker);
                  console.log("event", event.nativeEvent);
                }}
              />
            ))
            }
            {
              (this.state.newLocation) && <MapView.Marker
                key = {3.14}
                coordinate={{latitude: parseFloat(this.state.newLocation.latitude), longitude: parseFloat(this.state.newLocation.longitude)}}
                title={"View suggested projects"}
              />
            }
          </MapView>
      }
      <View style = {{right: 10, left: 160}} >
      <FAB buttonColor="red" iconTextColor="#FFFFFF"
        onClickAction={() => {
          if(this.state.recordTouch){
            ToastAndroid.show('Press to add a suggestion.', ToastAndroid.SHORT);
            this.setState({recordTouch: false, buttonSign: "+" });

          }else{
            ToastAndroid.show('Tap where you want to suggest.', ToastAndroid.SHORT);
            this.setState({recordTouch: true, buttonSign: "x" });

          }

        }}

        visible={true} iconTextComponent={<Text>{this.state.buttonSign}</Text>} />
      </View>
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
    flexDirection: 'column',
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
