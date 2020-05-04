import React, { Component } from 'react';
import AppContainer from './src/navigations/AppNavigation';
import checklogin from './Source/Network';
import LoginScreen from './src/screens/Login/LoginScreen';
class FoodApp extends React.Component {
  render() {
    if(checklogin())
    {
      return <AppContainer />
    }
    /*else{
      return <AppContainer />;
    }*/
  }
}

export default FoodApp;
