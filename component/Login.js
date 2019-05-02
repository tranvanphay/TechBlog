import React, { Component } from 'react'
import { StyleSheet, Text, View, Image,
TouchableWithoutFeedback, StatusBar,
TextInput, SafeAreaView, Keyboard, TouchableOpacity,
KeyboardAvoidingView 
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import {queryAllAccount} from '../database/allAccount.js'
import realm from '../database/allAccount.js'

const goToSignUp = () => {
    Actions.signup()
 }
 const gotoHome = () => {
    Actions.home()
  }
export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            account : [],
            user_name : '',
            password: '',
        }
        this.reloadData();
        realm.addListener('change',()=>{
            this.reloadData();
        })


    }
    reloadData = ()=>{
        queryAllAccount().then((account)=>{
            this.setState({account});
        }).catch((error)=>{
            this.setState({account : []});
        })
    }



    static navigationOptions = {
        header: null ,
      };

      handleEmail = (text) => {
        this.setState({user_name:text});
    }
    handlePassword = (text) =>{
        this.setState({password:text});
    }
    checkUser = (emailInput,passwordInput) =>{
     if(emailInput == "admin" && passwordInput =="admin"){
         this.props.navigation.navigate("home");
     }else{
         for(var i = 0;i<this.state.account.length;i++){
            if (emailInput == this.state.account[i].user_name){
                if(this.state.account[i].password == passwordInput){
                    //this.props.navigation.navigate("DashBoard");  
                    this.props.navigation.navigate("pageUser");
                    break; 
                }else{
                    alert('Sai tài khoản hoặc mật khẩu!');
                    break;
                }
                
            }
         }
     }
     
    
    } 

    render(){
       // const {navigate} = this.props.navigation;

        console.disableYellowBox = true
        return(
            <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../images/logo.png')}>
            </Image>
            <Text style ={styles.title}>Trang tin tức công nghệ</Text>
            </View>
            <View style={styles.infoContainer}>
            <TextInput style={styles.input}
                placeholder="Enter your Email"
                placeholderTextColor='rgba(225,225,225,0.8)'
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
                onSubmitEditing={() => this.refs.txtPassword.focus()}
                onChangeText = {this.handleEmail}

            />
            <TextInput style={styles.input}
            placeholder="Enter your Password"
            placeholderTextColor='rgba(225,225,225,0.8)'
            keyboardType=''
            returnKeyType='go'
            secureTextEntry
            autoCorrect={false}
            ref={"txtPassword"}
            onChangeText = {this.handlePassword}

            />
             <TouchableOpacity style={styles.buttonSignIn} onPress = {()=>this.checkUser(this.state.user_name,this.state.password)}>
             <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSignUp} onPress = {goToSignUp}>
             <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            </View>
            
           
        </KeyboardAvoidingView>
        </View>
)
    }
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#203546',
    flexDirection:'column',
},
logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
},
logo:{
    width:128,
    height:89,
},
title: {
    color : '#f7c744',
    fontSize: 18,
    textAlign: 'center',
    marginTop:5,
    opacity: 0.7,
},
infoContainer:{
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    height: 230,
},
input:{
    marginBottom:20,
    marginHorizontal:10,
    height:40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    color: '#FFF',
    flexDirection:'row'
},
buttonSignIn:{
    paddingVertical:10,
    marginHorizontal:10,
    backgroundColor:'#f7c744',
},
buttonSignUp:{
    paddingVertical:10,
    marginHorizontal:10,
    marginTop:10,
    backgroundColor:'#f7c744',
},
buttonText:{
    textAlign:'center',
    color:'white',
    fontSize:18,
    fontWeight:'bold'
}



})