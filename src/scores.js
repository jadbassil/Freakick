/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions, Alert } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Drawer from 'react-native-drawer';
import axios from 'axios';

var {height, width} = Dimensions.get('window');

export default class Scores extends Component<{}> {

  constructor(props){
    super(props);
    this.getmatches = this.getmatches.bind(this);
    this.getCompetitions = this.getCompetitions.bind(this);
    this.state={
      data:[],
      competitions:[],
      compId:1005,
      compName: 'UEFA Champions League',
    }
  }

  componentWillMount(){
    this.getmatches(moment().format('DD.MM.YYYY'), this.state.compId);
  }

  componentDidMount(){
    console.log(this.calendar.getSelectedDate().format('DD.MM.YYYY'));
    this.getCompetitions();
    setInterval(() => {this.getmatches(this.calendar.getSelectedDate().format('DD.MM.YYYY'), this.state.compId)}, 60000);

  }

  getmatches(day, comp){
    console.log('getting matches ...');
    axios.get('http://api.football-api.com/2.0/matches',{
      params: {
        comp_id : comp,
        from_date : day,
        to_date : day,
        gameWeek: '',
        Authorization : '565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76'
      }
    })
      .then(function (response){
        var arr = Object.values(response.data);
        console.log(arr);
        this.setState({data:arr, error:false, gameWeek: response.data[1].week});
        console.log(this.state.data);
      }.bind(this))
      .catch(function (error){
        if(error.response.status == 404)
          this.setState({data:["No matches this day"], error:true})

      }.bind(this));
  }

  getCompetitions(){
    console.log('getting competitions...');
    axios.get('http://api.football-api.com/2.0/competitions?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76')
      .then(function (response){
        var arr = Object.values(response.data);
        console.log(arr);
        this.setState({competitions:arr})
      }.bind(this));
  }

  gameStatus(status, time){
    if(status == "FT")
      return status;
    else
      return moment.utc(time,'HH:mm').local().format('HH:mm');
  }


  render() {

    const competitions = this.state.competitions.map( (item) =>{
      return(
            <View>
              <TouchableHighlight style={styles.container , {height:80, justifyContent:'center'}} onPress={()=>{
                this.setState({compId: item.id, compName: item.name});
                console.log(this.state.compId);
                this.getmatches(this.calendar.getSelectedDate().format('DD.MM.YYYY'), item.id);
                this._drawer.close()}}>

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginLeft:20, marginRight:20}}>
                  <View>
                    <Image source={require('./assets/barcelona.png')} style={{height:40, width:40, }}/>
                  </View>
                  <View>
                    <Text style={{fontSize:20}}>{item.region.toUpperCase()}: {item.name}</Text>
                  </View>
                  <View style={{width:40}}></View>
                </View>

              </TouchableHighlight>
            </View>
      )
    })

    const matches = this.state.data.map( (item) =>{
      if(item != "No matches this day")
        return (
          <View elevation={20} style={[styles.gameView,{marginTop:15}]}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:15, fontWeight:'bold'}}>{item.formatted_date}</Text>
              <Text>{item.venue}</Text>
            </View>

            <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center', marginLeft:50, marginRight:50, marginBottom:10}}>
              <View style={{alignItems:'center', width: (width-100)/2-25}}>
                <Image source={require('./assets/realmadrid.png')} style={{height:60, width:60}}/>
                <Text style={{fontSize:12}}>{item.localteam_name}</Text>
              </View>
              <View style={{marginTop:20, alignItems:'center', width:50}}>
                <Text style={{fontSize:20, color:'black'}}>{item.localteam_score} : {item.visitorteam_score}</Text>
                <Text>{this.gameStatus(item.status, item.time)}</Text>
              </View>
              <View style={{alignItems:'center', width: (width-100)/2-25}}>
                <Image source={require('./assets/barcelona.png')} style={{height:60, width:60}}/>
                <Text style={{fontSize:12}}>{item.visitorteam_name}</Text>
              </View>
            </View>

            <View>
              <View style={{height:1, backgroundColor:'grey'}}></View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <TouchableHighlight style={{flexDirection:'row', marginLeft:40, marginTop:10, marginBottom:10}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Image source={require('./assets/stats.png')}/>
                      <Text style={{marginLeft:5, fontSize:12}}>View Statistics</Text>
                    </View>
                  </TouchableHighlight>

                  <View></View>

                  <TouchableHighlight style={{flexDirection:'row', marginRight:40, marginTop:10, marginBottom:10}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Image source={require('./assets/comment.png')}/>
                      <Text style={{marginLeft:5, fontSize:12}}>Live comments</Text>
                    </View>
                  </TouchableHighlight>
              </View>
            </View>
          </View>
          )
          else
            return (<View style={{alignItems:'center'}}><Text style={{fontSize:20}}>No matches this day</Text></View>)
        }
        )

    return (
      <Drawer
        ref = {(ref) => this._drawer = ref}
        tapToClose = {true}
        content =
        {
          <ScrollView>{competitions}</ScrollView>
        }>

        <View style={styles.container}>

              <LinearGradient colors={['#FDBE21','#FAD961']} start={{x:0.0, y:0.0}} end={{x:1.0, y:0.0}} style={{justifyContent:'space-between'}}>
                <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between', marginLeft:20, marginRight:20, marginTop:15}}>
                  <TouchableHighlight onPress={() => this._drawer.open()}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Image source={require('./assets/drawer.png')} style={{width:30, height:30}}/>
                    </View>
                  </TouchableHighlight>
                  <View style={{alignItems:'center'}}>
                    <Text ref='x' style={{fontSize:18, color:'black'}}>{this.state.compName}</Text>
                    <Text>Gameweek {this.state.gameWeek}</Text>
                  </View>
                  <View style={{width:30}}></View>
                </View>
                <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'background', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={{height: 70, paddingTop: 0, paddingBottom: 10}}
                    calendarHeaderStyle={{color: 'transparent'}}
                    calendarColor={'transparent'}
                    dateNumberStyle={{color: 'black', fontWeight:'normal'}}
                    dateNameStyle={{color: 'black', fontWeight:'normal'}}
                    highlightDateNumberStyle={{color: 'black', fontWeight:'bold'}}
                    highlightDateNameStyle={{color: 'black', fontWeight:'bold'}}
                    disabledDateNameStyle={{color: 'black', fontWeight:'normal'}}
                    disabledDateNumberStyle={{color: 'black', fontWeight:'normal'}}
                    weekendDateNameStyle={{color: 'black', fontWeight:'normal'}}
                    weekendDateNumberStyle={{color: 'black', fontWeight:'normal'}}
                    onDateSelected={(e)=>{console.log(e.format('DD.MM.YYYY')), this.getmatches(e.format('DD.MM.YYYY'), this.state.compId);}}
                    ref={(elem) => this.calendar = elem}
                  />
              </LinearGradient>


              <ScrollView style={{flex:1, height: 1000}}>
                {matches}
              </ScrollView>

        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  gameView:{
    backgroundColor:'white',
    marginBottom:20,
    height:171,
    marginLeft:20,
    marginRight:20,
    borderRadius:5,
    justifyContent:'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }
  },
});
