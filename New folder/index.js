/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, { Component } from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import AppNavigator from './AppNavigator';
import { TabNavigator } from './TabNavigatorComponent';
import {name as appName} from './app.json';
import Splash from './component/Splash';
import Login from './component/Login';
import SignUp from './component/SignUp';
import { TabNavigator } from './component/TabNavigatorComponent';
class Main extends Component{
    constructor(props){
        super(props);
        this.state={ currentScreen:'Splash'};
        setTimeout(() =>{   
            this.setState({currentScreen:'Login'})
        },3000)
    }
    render(){
        const {currentScreen} =this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash/> : <Login/>
        return mainScreen
    }
}

AppRegistry.registerComponent(appName, () => TabNavigator);
