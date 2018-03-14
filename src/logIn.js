import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View, Button, TextInput, ToastAndroid, AsyncStorage} from 'react-native';
import axios from 'axios';

export default class LogIn extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = { 
            email: '',
            password: ''
         };
      }

      static navigationOptions = {
        tabBarVisible: false,
        title: 'Login',
        headerStyle:{
            backgroundColor:'#F7C01C',
            borderColor:'#F7C01C'
        },
        headerTintColor:'black'
        };

    componentWillMount(){
        if(AsyncStorage.getItem('userId') != null)
            this.props.navigation.navigate('Main');
    }

    login(){
        axios.post('http://api.freakick.me:3000/api/login',{
            email: this.state.email,
            password: this.state.password,
        })
        .then(function(res){
            console.log(res.data.id);
            if(res.data.success == true){
                AsyncStorage.setItem('userId', res.data.id);    
                this.props.navigation.navigate('Main');
            }else{
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
            }
        }.bind(this))
        .catch(function (err){
            console.log(err);      
        });
    }

    render() {
        return (
          <View style={styles.container}>
            <TextInput
                style={{height: 40, width:'100%', borderColor: 'gray', borderWidth: 1}}
                onChangeText={(email) => this.setState({email})}
                placeholder='email'
            />

             <TextInput
                style={{height: 40, width:'100%', borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.setState({password})}
                placeholder = 'password'
            />

            <Button
                title = 'Login' onPress={() => this.login()}
            />
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  });