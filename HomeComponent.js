// export default class HomeComponent extends Component {
//   static navigationOptions = ({ navigation }) => {
//     const { params = {} } = navigation.state;
//     let tabBarLabel = 'Home';
//     let tabBarIcon = () => (
//       <Image
//         source={require('./images/homeIcon.png')}
//         style={{ width: 26, height: 26, tintColor: '#0067a7' }}
//       />
//     );
//     return { tabBarLabel, tabBarIcon };
//   }
  
//   render() {
//     return (
//       <View style={{
//         flex: 1,
//         backgroundColor: '#0067a7',
//         alignItems: 'center',
//         justifyContent: 'center'
//         }}
//       >
//         <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>This is Home Screen</Text>
//       </View>
//     );
//   }
// }


import React, { Component } from 'react';
import { Text, View, Image, FlatList,TouchableOpacity,StyleSheet,Alert ,Dimensions} from 'react-native';
import{updateTodoList,deleteTodoList,queryAllTodoList} from './database/allSchemas.js';
import realm from './database/allSchemas.js';
import Swipeout from 'react-native-swipeout';
import PopupDialogComponent from './component/PopupDialogComponent.js';

import PopupDialog , {SlideAnimation, DialogTitle} from 'react-native-popup-dialog';
const deviceWidth = Dimensions.get('window').width; 
var like=0;


let FlatListItem = props => {
  const{itemIndex,id,name,creationDate,popupDialogComponent, onPressItem} = props;
  showEditModal=() =>{
    // popupDialogComponent.showDialogComponentForUpdate({
    //   id, name
    // });

  }
  showDeleteConfirmation = () => {
    Alert.alert(
      'Delete',
      'Delete a todoList',
      [
        {
          text:'No', onPress: () => {},
          style:'cancel'
        },
        {
          text:'Yes', onPress: () => {
            deleteTodoList(id).then().catch(error =>{
              alert(error)
            })
          }
        },

      ],
      {cancelable:true}
    );
  }
  


  return(
    <Swipeout right= {[
      {
        text:'Edit',
        backgroundColor:'rgb(81,134,237)',
        onPress: showEditModal
      },
      {
        text:'Delete',
        backgroundColor:'rgb(217,80,64)',
        onPress: showDeleteConfirmation,

      }
    ]} autoClose={true}
    
    >
    <TouchableOpacity onPress={onPressItem} style={{marginVertical:10,marginHorizontal:5}}>
          <View style={{backgroundColor: itemIndex %2==0? 'powderblue':'skyblue'}}>
          <View style={{flexDirection:'row'}}>
          <Image
          source={require('./images/avatar.png')}
          style={{ width: 26, height: 26, tintColor: '#e97600' }}
           />
           <Text style={{fontSize:20,fontWeight:'bold',color:'blue'}}>Admin</Text>
          </View>
          <Text style={{fontWeight:'bold', fontSize: 18, margin: 10,}}>{name}</Text>
          <Text style={{fontSize:15, textAlign:'right'}} numberOfLines={2}>{creationDate.toLocaleString()}</Text>
          </View>
    </TouchableOpacity>
    <View style={{flex:1,flexDirection:'row'}}>
    <Text style={{fontSize:18,color:'#f44242',fontWeight:'bold',marginLeft:70,marginRight:10}}>0</Text>
    <TouchableOpacity >
    <Image
          source={require('./images/like.png')}
          style={{ width: 26, height: 26, tintColor: '#f44242' }}
           />
    </TouchableOpacity>
    <TouchableOpacity>
            <Image
          source={require('./images/comment.png')}
          style={{ width: 26, height: 26, tintColor: '#4189f4',marginHorizontal:20,marginLeft: 50, }}
           />
    </TouchableOpacity>
    <TouchableOpacity>
            <Image
          source={require('./images/share.png')}
          style={{ width: 26, height: 26, tintColor: '#33ce40',marginHorizontal:70 }}
           />
     </TouchableOpacity>
    </View>
    </Swipeout>
  );
}
 export default class HomeComponent extends Component{


   constructor(props){
     super(props);
     this.state = {
      todoList: []
     };
     this.reloadData();
     realm.addListener('change', () => {
        this.reloadData();
     });
   }
   reloadData = () => {
     queryAllTodoList().then((todoList) => {
        this.setState({todoList});
     }).catch((error) => {
        this.setState({todoList: []});
     })
     console.log('reloadData');
   }
   static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let tabBarLabel = 'Home';
    let tabBarIcon = () => (
      <Image
        source={require('./images/homeIcon.png')}
        style={{ width: 26, height: 26, tintColor: '#4286f4' }}
      />
    );
    return { tabBarLabel, tabBarIcon };
  }


   render(){
     return(
      <View style={styles.container}>
      <Image
          source={require('./images/banner.png')}
          style={{ width: deviceWidth, height: deviceWidth/2.54957507082153 }}/>
      <FlatList
      style={styles.flatList}
      data={this.state.todoList}
      renderItem={({item,index}) => <FlatListItem {...item} itemIndex={index}
      popupDialogComponent={this.refs.popupDialogComponent}
      onPressItem={()=> {
        alert('You pressed item');
      }}/>}
      keyExtractor={item => item.id}
      />
      <PopupDialogComponent ref={'popupDialogComponent'}/>
      </View>
     );
   }
 }
 const styles= StyleSheet.create({
   container:{
     flex:1,
     flexDirection: 'column',
     justifyContent:'flex-start'
   },
   flatList:{
     flex:1,
     flexDirection:'column'
   }

 })

