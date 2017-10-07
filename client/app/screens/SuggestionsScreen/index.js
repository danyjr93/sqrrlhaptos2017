import React from 'react';
import {View, Text, StyleSheet, Platform, Button, Linking} from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../constants';

class MainScreen extends React.Component {
  constructor(props){
    super(props);
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
    console.log("Props", this.props.navigation.state.params.suggestions);
    return(
      <View style = {{marginLeft: 40, marginRight: 40, top: 20, borderStyle: 'solid', marginBottom: 10}}>
      {
        this.props.navigation.state.params.suggestions.map((suggestion, i) => (

        <View key = {i} style={{borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10}}>
          <View>
            <Text>Description:</Text>
            <Text>{suggestion.description}</Text>
          </View>
          <View>
            <Text>Justification:</Text>
            <Text>{suggestion.justification}</Text>
          </View>
          <View style = {{flexDirection: "row", justifyContent: 'space-between', marginBottom: 10}}>
          <View style = {{marginTop: 20, width: '40%'}}>
            <Button style = {{backgroundColor: '#ff5722'}} title = {"Vote"}  onPress = {() => {
              console.log(suggestion); ;
            }} />
          </View>
          <View style = {{marginTop: 20, width: '40%'}}>
            <Button style = {{backgroundColor: '#ff5722'}} title = {"View proposal"}  onPress = {() => {
                var url = "http://107.170.210.182:3000/vr";
                Linking.canOpenURL(url).then(supported => {
                if (supported) {
                  Linking.openURL(url);
                } else {
                  alert("Don't know how to open URI: " + url);
                }
              });
            }} />
          </View>
          </View>
        </View>
        ))
      }
      <View style = {{marginTop: 20}}>
        <Button style = {{backgroundColor: '#ff5722'}} title = {"Add suggestion"}  onPress = {() => {
          console.log(suggestion); ;
        }} />
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
    alignItems: 'center',
  }
})
