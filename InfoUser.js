import React, { Component } from 'react';
import { Text, View,FlatList, Image,Dimensions,StyleSheet,TouchableOpacity ,Alert} from 'react-native';
import{updateTodoList,deleteTodoList,queryAllTodoList} from './database/allSchemas.js';
import realm from './database/allSchemas.js';
import Swipeout from 'react-native-swipeout';
import PopupDialogComponent from './component/PopupDialogComponent.js';
const deviceHeight = Dimensions.get('window').height; 
const deviceWidth = Dimensions.get('window').width; 

export default class InfoComponent extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let tabBarLabel = 'Info';
    let tabBarIcon = () => (
      <Image
        source={require('./images/info.png')}
        style={{ width: 26, height: 26, tintColor: '#964f8e' }}
      />
    );
    return { tabBarLabel, tabBarIcon };
  }
  
  render() {
    return (
      <View style={{flex:1}}>
          <Image style={{height:deviceWidth/1.351020408163265,width:deviceWidth}} source={require('./images/page.png')}/>
     
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flatList:{
    flex:1,
    flexDirection:'column'
  }
})