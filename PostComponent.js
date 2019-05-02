import React, { Component } from 'react';
import { Text, View, Image, TextInput, Keyboard,TouchableOpacity } from 'react-native';
import { insertNewTodoList, updateTodoList} from './database/allSchemas'
export default class PostComponent extends Component {

    constructor(props){
      super(props);
      this.state = {
        id:0,
        name:'',
        isAddNew:true,
      };
    }


  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let tabBarLabel = 'New Post';
    let tabBarIcon = () => (
      <Image
        source={require('./images/new.png')}
        style={{ width: 26, height: 26, tintColor: '#e97600' }}
      />
    );
    return { tabBarLabel, tabBarIcon };
  }
  
  render() {
    return (
      <View style={{
        flex: 1,
        }}
      >
      <Text style={{fontSize:20,fontWeight:'bold',textColor:'#4277f4'}}>Write a new post</Text>
      <TextInput style={{ flex:1,marginHorizontal:20,marginBottom:20,backgroundColor:'white',textAlignVertical: 'top',fontSize: 18,}} 
      returnKeyType='none'
       multiline={true} 
       editable={true} 
       autoFocus='true'
       onChangeText={(text) => this.setState({name:text})} value={this.state.name}/>
      <TouchableOpacity style={{paddingVertical: 10 ,marginHorizontal:50,marginBottom:10   ,backgroundColor:'#f7c744'}}
      onPress={() =>{
        const newPost = {
          id: Math.floor(Date.now() / 1000),
          name: this.state.name,
          creationDate: new Date()
    };
    insertNewTodoList(newPost).then().catch((error) => {
          alert(error );
          
    });
    
        }
      } 
      >
             <Text style={{textAlign:'center', color:'white',fontSize:18,fontWeight:'bold'}}>Post</Text>
            </TouchableOpacity>
      
      </View>
          
    );
  }
}