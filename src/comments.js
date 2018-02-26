import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {TabNavigator} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {GiftedChat} from 'react-native-gifted-chat';
var {height, width} = Dimensions.get('window');

export default class Comments extends Component {

    constructor(props){
        super(props);
        this.stats = this.stats.bind(this);
        this.comment = this.comment.bind(this);
        this.state={
            messages: [],
            color1:"#F7C01C",
            color2:"#9B9B9B",
            index:0,
            hello: null
        }
      }

    static navigationOptions = {
        tabBarVisible: false,
        title: 'Comments',
        headerStyle:{
            backgroundColor:'#F7C01C',
            borderColor:'#F7C01C'
        },
        headerTintColor:'black'
        };

        onSend(messages = []) {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, messages),
            }))
          }


render() {
  const { params } = this.props.navigation.state;
  const localTeam = params ? params.localTeam : null;
  const visitorTeam = params ? params.visitorTeam : null;
  const score = params ? params.score : null;
  const venue = params ? params.venue : null;
  return (
    <View style={styles.container}>
      <View elevation={20} style={{height: '14%', width: '100%', justifyContent: 'space-between', flexDirection:'row'}}>
        <Image source={require('./assets/realmadrid.png')} style={{height: 60, width: 45, marginTop: '3%'}}/>
        <View style={{alignItems:'center', marginTop: '3%'}}>
            <Text>Championse League | Stadio Paolo Mazza | 72</Text>
            <LinearGradient colors={['#F7C01C','#FBDA61']} start={{x:0.0, y:0.0}} end={{x:1.0, y:0.0}} style={{justifyContent:'center',width:width*0.093,alignItems:'center'}}>
                <Text> 0 : 0 </Text>
            </LinearGradient>
        </View>
        <Image source={require('./assets/realmadrid.png')} style={{height: 60, width: 45, marginTop: '3%'}}/>
      </View>
      <View elevation={20}>
          <View style={{height:0.5, backgroundColor:'#E9E9E9'}}></View>
            <View style={{flexDirection:'row', justifyContent:'space-between',alignSelf:'center'}}>
  
              <TouchableHighlight underlayColor={"transparent"} style={{flexDirection:'row', marginTop:10, marginBottom:10}} onPress={this.stats}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={require('./assets/stats.png')}/>
                  <Text style={{marginLeft:5, fontSize:10,color:this.state.color2}}>View Statistics</Text>
                </View>
              </TouchableHighlight>
  
              <View style={{marginLeft:40,marginRight:40}}></View>
  
              <TouchableHighlight style={{flexDirection:'row',marginTop:10, marginBottom:10}} underlayColor={'transparent'} onPress={this.comment}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={require('./assets/comment.png')}/> 
                  <Text style={{marginLeft:5,fontSize:10,color:this.state.color1}}>Live comments</Text>
                </View>
              </TouchableHighlight>
          </View>
          <View style={{height:0.5, backgroundColor:'#E9E9E9'}}></View>
        </View>
        <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
            _id: 1,
            }}
        />
    </View>
    );
  }

  /*renderCom(){
    if(this.state.color1 = "#9B9B9B"){
      return (
      <View>
        <Image source={require('./assets/comment.png')}/>
        </View>
    );
    }else{
      return <Image source={require('./assets/comment.png')}/>
    }
  }*/

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
  backgroundColor: '#F7F7F7',
  flexDirection:'column',
  width:'100%'
},
icon:{
  width:25.39,
  height:24.21
}
});
