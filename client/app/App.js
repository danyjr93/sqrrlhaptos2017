import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import store from './store';
import MainScreen from './screens/MainScreen';

export default class App extends React.Component {
  constructor(props){
    super(props);
    console.log("in app constructor");

  }
  
  render() {
    const MainNavigator = StackNavigator({
      Main: { screen: MainScreen }
    });

    return (
      <Provider store = {store}>
        <MainNavigator />
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
