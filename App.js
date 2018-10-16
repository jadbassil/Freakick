import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {StackNavigator,TabNavigator,SwitchNavigator} from 'react-navigation';

import Scores from './src/scores.js';
import Profile from './src/profile.js';
import Favourite from './src/favourite.js'
import Stats from './src/stats';
import LogIn from './src/logIn.js';
import Comments from './src/comments';

const ScorePage =  StackNavigator({
  Scores: {
    screen: Scores,
  },
  Statistics:{
    screen:Stats
  },
  Comments:{
    screen: Comments,
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
});

const MyApp = createBottomTabNavigator({
  Explore: {
    screen: ScorePage,
    navigationOptions: {
      tabBarLabel: 'SCORES',
      tabBarIcon: ({ tintColor }) => (
       <Image source={require('./src/assets/scores.png')} style={[styles.icon, {tintColor: tintColor}]}/>
     )
    }
  },
  Favorites: {
    screen: FavPage,
    navigationOptions: {
      tabBarLabel: 'FAVORITES',
      tabBarIcon: ({ tintColor }) => (
       <Image source={require('./src/assets/favorite.png')} style={[styles.icon, {tintColor: tintColor}]}/>
     )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
       <Image source={require('./src/assets/search.png')} style={[styles.icon, {tintColor: tintColor}]}/>
     )
    }
  }
  }


const Login = createStackNavigator({ Home: Home, Item: Item });
const Register = createStackNavigator({ SignIn: Login });
const App = createStackNavigator({ SignIn: Login });

