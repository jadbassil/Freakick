import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {TabNavigator} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
var {height, width} = Dimensions.get('window');

export default class Stats extends Component{

  static navigationOptions = {
    tabBarLabel: 'Live Score',
    tabBarIcon: ({tintColor}) => (
      <Image source={require('./assets/scores.png')} style={[styles.icon, {tintColor: tintColor}]}/>
    ),
    title: 'Match',
   headerStyle:{
     backgroundColor:'#F7C01C',
     borderColor:'#F7C01C'
   },
   headerTintColor:'black'
  };

  constructor(props){
    super(props);
    this.stats = this.stats.bind(this);
    this.comment = this.comment.bind(this);
    this.state={
      color1:"#F7C01C",
      color2:"#9B9B9B",
      index:0,
      hello: null
    }
  }
  
  renderCom(){
    if(this.state.color1 = "#9B9B9B"){
      return (
      <View>
        <Image source={require('./assets/comment.png')}/>
        </View>
    );
    }else{
      return <Image source={require('./assets/comment.png')}/>
    }
  }

render() {
  const { params } = this.props.navigation.state;
  const localTeam = params ? params.localTeam : null;
  const visitorTeam = params ? params.visitorTeam : null;
  const score = params ? params.score : null;
  const venue = params ? params.venue : null;

  return (
    <View style={styles.container}>
      <View elevation={20} style={[styles.gameView,{marginTop:0}]}>
      
      <View style={{marginTop:20}}>
      <Text style={{textAlign:'center',fontWeight:"700", fontSize:16}}>Champions League</Text>
      <Text style={{textAlign:'center',fontWeight:"300", fontSize:13}}>{venue}</Text>
      </View>

        <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center', marginLeft:50, marginRight:50, marginBottom:10,marginTop:20}}>
          <View style={{alignItems:'center', width: (width-100)/2-25}}>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/freakick-c4717.appspot.com/o/clubs%2Fla%20ligua%2FReal-Betis.png?alt=media&token=dfd8de0c-88d0-4347-a2d6-964e362ec783'}} style={{height:50, width:50}}/>
            <Text style={{fontSize:13,color:'#9B9B9B',marginTop:10,fontWeight:"100",textAlign:'left'}}>{localTeam}</Text>
          </View>
          <View style={{marginTop:-10, alignItems:'center', width:50}}>
            <Text style={{fontSize:20, color:'black',fontWeight:"600",fontSize:24,letterSpacing:2,alignSelf:'center'}}>{score}</Text>
          </View>
          <View style={{alignItems:'center', width: (width-100)/2-25}}>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/freakick-c4717.appspot.com/o/clubs%2Fla%20ligua%2FCD-Alav%C3%A9s.png?alt=media&token=9a3725de-053a-411d-b458-a8bf844941f0'}} style={{height:50, width:50}}/>
            <Text style={{fontSize:13,color:'#9B9B9B',marginTop:10,fontWeight:"100",textAlign:'center'}}>{visitorTeam}</Text>
          </View>
        </View>
  
        <View>
          <View style={{height:0.5, backgroundColor:'#E9E9E9'}}></View>
            <View style={{flexDirection:'row', justifyContent:'space-between',alignSelf:'center'}}>
  
              <TouchableHighlight underlayColor={"transparent"} style={{flexDirection:'row', marginTop:10, marginBottom:10}} onPress={this.stats}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={require('./assets/stats.png')}/>
                  <Text style={{marginLeft:5, fontSize:10,color:this.state.color1}}>View Statistics</Text>
                </View>
              </TouchableHighlight>
  
              <View style={{marginLeft:40,marginRight:40}}></View>
  
              <TouchableHighlight style={{flexDirection:'row',marginTop:10, marginBottom:10}} underlayColor={'transparent'} onPress={this.comment}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  {this.renderCom()}
                  <Text style={{marginLeft:5,fontSize:10,color:this.state.color2}}>Live comments</Text>
                </View>
              </TouchableHighlight>
          </View>
        </View>
      </View>
      <Text>Hello</Text>
    </View>
    );
  }
  stats(){
    this.setState({
      color1:"#F7C01C",
      color2:"#9B9B9B",
      index:0
    })
  }

  comment(){
    this.setState({
      color1:"#9B9B9B",
      color2:"#F7C01C",
      index:1
    })
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white',
  width:'100%',
  justifyContent:'space-between'
},
icon:{
  width:32,
    height:26
},
gameView:{
  backgroundColor:'#F7F7F7',
  marginBottom:20,
  height:195,
  width:width,
  borderRadius:5,
  justifyContent:'space-between',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
},
});
