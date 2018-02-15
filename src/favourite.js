import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {TabNavigator} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';


export default class Favorite extends Component<{}> {

  static navigationOptions = {
   tabBarLabel: 'Favorite',
   tabBarIcon: ({tintColor}) => (
     <Image
       source={require('./assets/favorite.png')}
       style={[styles.icon, {tintColor:tintColor}]}
     />
   ),
  };


render() {
  return (
    <View style={styles.container}>
      <Text>Favourite</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#F7F7F7',
  flexDirection:'row',
  width:'100%'
},
icon:{
  width:25.39,
  height:24.21
}
});
