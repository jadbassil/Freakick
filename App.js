  /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Scores from './src/scores.js';
import Profile from './src/profile.js';
import Settings from './src/settings.js'

var mainScreenNavigator = StackNavigator({
  Scores: {screen: Scores},
  Profile: {screen: Profile},
  Settings: {screen: Settings},
},
  {
    headerMode:'none',
});




export default mainScreenNavigator;
