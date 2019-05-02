import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView 
    } from 'react-native'
    import { Actions } from 'react-native-router-flux';
    import { insertAccount} from '../database/allAccount'

    const goToLogin = () => {
        Actions.login()
     }
    export default class SignUp extends Component{

        constructor(props){
            super(props);
            this.state = {
              id:0,
              user_name:'',
              password:'',
              isAddNew:true,
            };
          }


        static navigationOptions = {
            header: null ,
          };
        render(){
            console.disableYellowBox = true;
            
            return(
                <View style={styles.container}>
                <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../images/logo.png')}>
                </Image>
                </View>
                <View style={styles.alignInput}>
                 <TextInput style={styles.input}
                placeholder="Enter your Email"
                placeholderTextColor='rgba(225,225,225,0.8)'
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
                onSubmitEditing={() => this.refs.txtPassword.focus()}
                onChangeText={(text) => this.setState({user_name:text})} value={this.state.user_name}
                />
                <TextInput style={styles.input}
            placeholder="Enter your Password"
            placeholderTextColor='rgba(225,225,225,0.8)'
            keyboardType=''
            returnKeyType='go'
            secureTextEntry
            autoCorrect={false}
            ref={"txtPassword"}
            onChangeText={(text) => this.setState({password:text})} value={this.state.password}
            />
           {/* <TextInput style={styles.input}
            placeholder="Re-Password"
            placeholderTextColor='rgba(225,225,225,0.8)'
            keyboardType=''
            returnKeyType='go'
            secureTextEntry
            autoCorrect={false}
            ref={"txtPassword"}
            /> */}
            <TouchableOpacity style={styles.buttonSignUp} 
               onPress={() =>{
                const newAccount = {
                  id: Math.floor(Date.now() / 1000),
                  user_name: this.state.user_name,
                  password:this.state.password,
                  creationDate: new Date()
            };
            insertAccount(newAccount).then().catch((error) => {
                  alert(error );
                  
            });
            
                }
              } 
            
            >
             <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            </View>

                </View>
            )
    }
}
const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#203546',
        flexDirection:'column',
    },
    input:{
        marginBottom:20,
        marginHorizontal:10,
        height:40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        color: '#FFF',
        flexDirection:'row'
    },
    buttonSignUp:{
        paddingVertical:10,
        marginHorizontal:10,
        marginVertical:10,
        backgroundColor:'#f7c744',
    },
    buttonText:{
        textAlign:'center',
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    },
    logo:{
        width:128,
        height:89,
    },
    logoContainer: {
        height:100,
        alignItems: 'center',
        justifyContent:'center',
    
        flex:1,
    },
    alignInput:{
        alignContent:'center',
        justifyContent:'center'
    }

})