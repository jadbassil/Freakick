import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import Scores from './src/scores.js';
import Profile from './src/profile.js';
import Favourite from './src/favourite.js'

/*var mainScreenNavigator = StackNavigator({
  Scores: {screen: Scores},
  Profile: {screen: Profile},
  Settings: {screen: Settings},
},
  {
    headerMode:'none',
});*/

const MyApp = TabNavigator({
  Scores: {
    screen: Scores,
  },
  Favs: {
    screen:Favourite ,
  },
  Profile: {
    screen:Profile,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default MyApp;
