import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {TabNavigator} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

export default class Profile extends Component<{}> {


render() {
  return (
    <View style={styles.container}>
      <Text style={{marginTop:30}}>Hello World</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#F7F7F7',
  width:'100%',
  justifyContent:'space-between'
},
icon:{
  width:25.39,
  height:24.21
}
});
