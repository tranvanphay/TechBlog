import React , {Component} from 'react'
import {Image,View,StyleSheet,TextInput,TouchableOpacity,Text,Dimensions, ScrollView} from 'react-native'
import {Input,Icon} from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import {queryAllUser} from './database/AllSchemas.js'
import realm from './database/AllSchemas.js'

const deviceHeight = Dimensions.get('window').height; 
const deviceWidth = Dimensions.get('window').width; 
export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : [],
            email : '',
            password: '',
        }
        this.reloadData();
        realm.addListener('change',()=>{
            this.reloadData();
        })


    }
    reloadData = ()=>{
        queryAllUser().then((user)=>{
            this.setState({user});
        }).catch((error)=>{
            this.setState({user : []});
        })
    }

    static navigationOptions = { //Custom header navigation
        header : null,
      };
    
    handleEmail = (text) => {
        this.setState({email:text});
    }
    handlePassword = (text) =>{
        this.setState({password:text});
    }
    checkUser = (emailInput,passwordInput) =>{
     if(emailInput == "admin" && passwordInput =="admin"){
         this.props.navigation.navigate("AdminPost");
     }else{
         for(var i = 0;i<this.state.user.length;i++){
            if (emailInput == this.state.user[i].email){
                if(this.state.user[i].password == passwordInput){
                    this.props.navigation.navigate("DashBoard");  
                    break; 
                }else{
                    alert('Uncorrect...');
                    break;
                }
                
            }
            // else {
            //     alert('Uncorrect...');
            //     continue;
            // }
         }
     }
     
    
    } 
    render(){
        const {navigate} = this.props.navigation;
        return(
            <ScrollView style={{backgroundColor: "#2F3440",}}>
                <View  style = {styleApp.container}>
                <Image source={require('./images/flat_circle.png')} style={{width:deviceWidth,height:deviceHeight/1.5,position:'absolute',top:-deviceHeight/4}} />   
                <Text style ={{fontSize:20,color:'white',marginTop:25,marginRight:5,fontFamily:'Courgette_Regular'}}>Welcome</Text>
                <Image source ={require('./images/logo_umbrella.png')} style={{height:57,width:155,marginTop:deviceHeight/20}}/>  
                <View style ={{marginTop: deviceHeight/4}}>              
                    <View style = {styleApp.input}>
                    <Input
                        placeholder='E-Mail...'
                        placeholderTextColor = '#f2f2f2'
                        style = {{color:'#f2f2f2'}}
                        inputStyle = {{color:'white'}}
                        onChangeText = {this.handleEmail}
                        leftIcon={
                            <Icon
                            name='email'
                            size={24}
                            color='#f2f2f2'
                            />}
                        />
                    </View>
                    
                    <View style = {styleApp.input}>
                    <Input
                        placeholder='Password...'
                        placeholderTextColor = '#f2f2f2'
                        onChangeText = {this.handlePassword}
                        secureTextEntry = {true}
                        inputStyle = {{color:'white'}}
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            color='#f2f2f2'
                            />}
                        />
                    </View>
                    <TouchableOpacity style = {styleApp.buttonLogin} onPress = {()=>this.checkUser(this.state.email,this.state.password)} >
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <View>
                    <Text style = {{marginTop:20,color:'white',fontStyle:'italic',alignSelf: 'center',}}>Dont have an account? </Text>
                    <TouchableOpacity style = {{alignItems:'center'}}
                     onPress = {()=>navigate("SignUp")}
                    >
                        <Text style ={{color:'blue',textDecorationLine:'underline',color: '#db710f'}}>Sign Up</Text>
                    </TouchableOpacity>
                    
                    </View>
                 </View> 
                 </View>
                 </ScrollView>
        )
    }
}
const styleApp = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#2F3440',
        flex: 1,
    },
    buttonLogin:{
        width: 300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#db710f',
        borderRadius: 10,
        marginTop: 40,
    },
    input : {
        width : 320,
        height:50,
        color : 'white',      
        marginTop:30,
        backgroundColor : 'rgba(234, 234, 234, 0.1)'
    },
    // viewWelcome : {
    //     flexDirection: 'row'
    // }
})