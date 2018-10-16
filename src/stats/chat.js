import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {TabNavigator} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client';


export class Chat extends Component<{}> {

  constructor(props){
    super(props);
    this.stats = this.stats.bind(this);
    this.comment = this.comment.bind(this);
    socket = io('http://api.freakick.me:3001', {
      transports: ['websocket']
    });
    this.state={
        messages: [],
        userMessage: '',
        userId: '',
    }
    socket.on('new message', function (mes) {
      console.log(mes);
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, mes),
        }))
    }.bind(this));
  }

  componentWillMount(){
    console.log('getting messages...');
    socket.emit('new room', {roomId: this.props.navigation.state.params.room_id});
    this.getMessages();
  }

  componentDidMount(){
    AsyncStorage.getItem('userId').then(value => this.setState({userId: value}));
  }
  
  getMessages(){
    axios.get('http://api.freakick.me:3000/api/getMessages',{
      params:{
        roomId: this.props.navigation.state.params.room_id,
      }
    })
    .then(function(res){
      this.state.messages = res.data.messages;
    }.bind(this))
    .catch(function(err){
      console.log(error);
    }.bind(this));
    console.log(this.state.messages);
  } 

  onSend(messages = []) {
    console.log(this.state.userId);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    socket.emit('new message', {
       message: this.state.userMessage,
       user:{
        _id: this.state.userId,
       },
      roomId: this.props.navigation.state.params.room_id
      });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#FF926C',
          },
          right: {
            backgroundColor: '#FBDA61'
          }
        }}
       />
    );
  }

  render() {
  return (
    <View>
      <GiftedChat
              messages={this.state.messages}
              onInputTextChanged={text => { this.setState({userMessage: text})}}
              onSend={messages => this.onSend(messages)}
              user={{
              _id: this.state.userId,
              }}
              
          />
    </View>
    );
  }
}

const styles = StyleSheet.create({
icon:{
  width:25.39,
  height:24.21
}
});
