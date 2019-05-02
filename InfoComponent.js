import React, { Component } from 'react';
import { Text, View,FlatList, Image,Dimensions,StyleSheet,TouchableOpacity ,Alert} from 'react-native';
import{updateTodoList,deleteTodoList,queryAllTodoList} from './database/allSchemas.js';
import realm from './database/allSchemas.js';
import Swipeout from 'react-native-swipeout';
import PopupDialogComponent from './component/PopupDialogComponent.js';
const deviceHeight = Dimensions.get('window').height; 
const deviceWidth = Dimensions.get('window').width; 
let FlatListItem = props => {
  const{itemIndex,id,name,creationDate,popupDialogComponent, onPressItem} = props;
  showEditModal=() =>{
    popupDialogComponent.showDialogComponentForUpdate({
      id, name
    });

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
    </Swipeout>
  );
}
export default class InfoComponent extends Component {

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
          <Text style={{color:'grey',fontSize:20,fontWeight:'bold',alignItems: 'flex-start',marginLeft: 10,}}>Your Post</Text>
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