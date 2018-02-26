import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions, Alert } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Drawer from 'react-native-drawer-menu';
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
      compId:1204,
      compName:'Premier League',
    }
  }

  
  static navigationOptions = {
   tabBarLabel: 'Live Score',
   tabBarIcon: ({tintColor}) => (
     <Image source={require('./assets/scores.png')} style={[styles.icon, {tintColor: tintColor}]}/>
   ),
    headerTitleStyle: {
      height: 370,
    },
    headerTitle: (
      <LinearGradient colors={['#F7C01C','#FBDA61']} start={{x:0.0, y:0.0}} end={{x:1.0, y:0.0}} style={{justifyContent:'center',width:width,alignItems:'center',height:85}}>
       <Image source={require('./assets/blogo.png')} style={{width:110,height:20}}/>
      </LinearGradient>
   )
 };

 

  componentWillMount(){
    this.getmatches(moment().format('DD.MM.YYYY'), this.state.compId);
  }

  componentDidMount(){
    this.getCompetitions();
    setInterval(() => {this.getmatches(this.calendar.getSelectedDate().format('DD.MM.YYYY'), this.state.compId)}, 60000);

  }

  getmatches(day, comp){
    console.log('getting matches ...');
    axios.get('http://api.football-api.com/2.0/matches?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76',{
      params: {
        comp_id : comp,
        from_date : day,
        to_date : day,
        gameWeek: ''
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
      return (
        <View key={item.id}>
              <TouchableHighlight style={styles.container,{height:80, justifyContent:'center'}} onPress={()=>{
                this.setState({compId: item.id, compName: item.name});
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
     if(item != "No matches this day"){
      return (
        <View key={item.id} elevation={20} style={[styles.gameView,{marginTop:0}]}>
        <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center', marginLeft:50, marginRight:50, marginBottom:10,marginTop:30}}>
          <View style={{alignItems:'center', width: (width-100)/2-25}}>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/freakick-c4717.appspot.com/o/clubs%2Fla%20ligua%2FReal-Betis.png?alt=media&token=dfd8de0c-88d0-4347-a2d6-964e362ec783'}} style={{height:50, width:50}}/>
            <Text style={{fontSize:13,color:'#9B9B9B',marginTop:10,fontWeight:"100",textAlign:'center'}}>{item.localteam_name}</Text>
          </View>
          <View style={{marginTop:-10, alignItems:'center', width:50}}>
            <Text style={{fontSize:20, color:'black',fontWeight:"600",fontSize:24,letterSpacing:2,alignSelf:'center'}}>{item.localteam_score}:{item.visitorteam_score}</Text>
          </View>
          <View style={{alignItems:'center', width: (width-100)/2-25}}>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/freakick-c4717.appspot.com/o/clubs%2Fla%20ligua%2FCD-Alav%C3%A9s.png?alt=media&token=9a3725de-053a-411d-b458-a8bf844941f0'}} style={{height:50, width:50}}/>
            <Text style={{fontSize:13,color:'#9B9B9B',marginTop:10,fontWeight:"100",textAlign:'center'}}>{item.visitorteam_name}</Text>
          </View>
        </View>
  
        <View>
          <View style={{height:0.5, backgroundColor:'#E9E9E9'}}></View>
            <View style={{flexDirection:'row', justifyContent:'space-between',alignSelf:'center'}}>
  
              <TouchableHighlight underlayColor={"transparent"} style={{flexDirection:'row', marginTop:10, marginBottom:10}} onPress={(e)=>this.props.navigation.navigate('Statistics',{
                localTeam:item.localteam_name,
                visitorTeam:item.visitorteam_name,
                score:item.localteam_score+":"+item.visitorteam_score,
                venue:item.venue
              })}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={require('./assets/stats.png')}/>
                  <Text style={{marginLeft:5, fontSize:10,color:'#9B9B9B'}}>View Statistics</Text>
                </View>
              </TouchableHighlight>
  
              <View style={{marginLeft:40,marginRight:40}}></View>
  
              <TouchableHighlight style={{flexDirection:'row',marginTop:10, marginBottom:10}} onPress={(e)=>this.props.navigation.navigate('Comments',{
                localTeam:item.localteam_name,
                visitorTeam:item.visitorteam_name,
                score:item.localteam_score+":"+item.visitorteam_score,
                venue:item.venue
              })}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={require('./assets/comment.png')}/>
                  <Text style={{marginLeft:5,fontSize:10,color:"#9B9B9B"}}>Live comments</Text>
                </View>
              </TouchableHighlight>
  
          </View>
        </View>
      </View>
       )
     }else {
      return (<View style={{alignItems:'center'}}><Text style={{fontSize:20}}>No matches this day</Text></View>)
     }
    })

    return (

        <View style={styles.container}>

              <LinearGradient colors={['#F7C01C','#FBDA61']} start={{x:0.0, y:0.0}} end={{x:1.0, y:0.0}} style={{justifyContent:'space-between',height:60}}>
                    <View style={{alignItems:'center'}}>
                    </View>
                <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between', marginLeft:20, marginRight:20, marginTop:-5}}>
                  <View style={{width:30}}></View>
                </View>
                <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'background', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={{height: 70, paddingTop: 0, paddingBottom: 10}}
                    calendarHeaderStyle={{color: 'transparent'}}
                    calendarColor={'transparent'}
                    dateNumberStyle={{color: '#282828', fontWeight:'300'}}
                    dateNameStyle={{color: '#282828', fontWeight:'300'}}
                    highlightDateNumberStyle={{color: '#282828', fontWeight:'bold'}}
                    highlightDateNameStyle={{color: '#282828', fontWeight:'bold'}}
                    disabledDateNameStyle={{color: '#282828', fontWeight:'300'}}
                    disabledDateNumberStyle={{color: '#282828', fontWeight:'300'}}
                    weekendDateNameStyle={{color: '#282828', fontWeight:'300'}}
                    weekendDateNumberStyle={{color: '#282828', fontWeight:'300'}}
                    onDateSelected={(e)=>{console.log(e.format('DD.MM.YYYY')), this.getmatches(e.format('DD.MM.YYYY'), this.state.compId);}}
                    ref={(elem) => this.calendar = elem}
                  />
                  </LinearGradient>


              <ScrollView style={{flex:1, height: 1000}}>
                <View style={{alignItems:'center',marginTop:10}}>
                {matches}
                </View>
              </ScrollView>

        </View>
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
    height:175,
    width:338,
    borderRadius:5,
    justifyContent:'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  icon:{
    width:32,
    height:26
  }
});
