import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {TabNavigator} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';



export default class Settings extends Component<{}> {

  static navigationOptions = {
   tabBarLabel: 'Favorite',
   tabBarIcon: ({tintColor}) => (
     <Image
       source={require('./assets/stats.png')}
       style={[styles.icon, {tintColor: 'yellow'}]}
     />
   ),
  };


render() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>

      <LinearGradient elevation={40} colors={['#FDBE21','#FAD961']} start={{x:0.0, y:0.0}} end={{x:1.0, y:0.0}} style={{justifyContent:'space-between', flexDirection:'row', height:100, marginBottom:-50}}>
        <TouchableHighlight onPress={(e)=>this.props.navigation.navigate('Scores')}>
          <View>
            <Text>Scores</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={(e)=>this.props.navigation.navigate('Profile')}>
          <View>
            <Text>My Profile</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={(e)=>this.props.navigation.navigate('Settings')}>
          <View>
            <Text>Settings</Text>
          </View>
        </TouchableHighlight>
      </LinearGradient>

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
});
