import React, { Component } from 'react'

import Splash from './Splash';
import Login from './Login';
export default class Main extends Component{
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
