import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import Scores from './src/scores.js';
import Profile from './src/profile.js';
import Favourite from './src/favourite.js'
import Stats from './src/stats';

const scorePages =  StackNavigator({
  Scores: {
    screen: Scores,
  },
  Statistics: {
    screen: Stats,
  },
}, {
  initialRouteName: 'Scores',
  
});

const FavPage =  StackNavigator({
  Favorite: {
    screen: Favourite,
  },
  Statistics: {
    screen: Stats,
  },
}, {
  initialRouteName: 'Favorite',
  title:'none'
});


const MyApp = TabNavigator({
  Scores: {
    screen: scorePages,
  },
  Favs: {
    screen: FavPage,
  },
  Profile: {
    screen: Profile,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#F7C01C',
  },
});

export default MyApp;
