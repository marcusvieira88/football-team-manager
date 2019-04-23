import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";

const Project= createStackNavigator({
  Login: {
   screen: Login
  },
  Home: {
   screen: Home
  }
});
export default createAppContainer(Project);
