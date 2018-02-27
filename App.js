import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import Scores from './src/scores.js';
import Profile from './src/profile.js';
import Favourite from './src/favourite.js'
import Stats from './src/stats';
import LogIn from './src/logIn.js';
import Comments from './src/comments';



const scorePages =  StackNavigator({
  Scores: {
    screen: Scores,
  },
  Statistics: {
    screen: Stats,
  },
  Comments:{
    screen: Comments,
  },
  /*Login:{
    screen: Auth,
  }*/
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
    showIcon: true,
    activeTintColor: '#F7C01C',
    inactiveTintColor: 'black',
    labelStyle: {
      fontSize: 9,
    },
    style: {
      height: 50,
      backgroundColor: 'white',
    }
  },
});

const auth = StackNavigator({
  Login:{
    screen: LogIn,
  },
  Main:{
    screen: MyApp,
  }
},{
  headerMode: 'none',
  initialRouteName: 'Login',
});

export default auth;
