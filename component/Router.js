import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import SplashWithLogin from './SplashWithLogin.js'
import SignUp from './SignUp.js'
import Login from './Login.js'
import TabNavigatorComponent from '../TabNavigatorComponent.js'
import TabNavigatorUser from '../TabNavigateUser.js'





const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "login" component = {Login} initial = {true} />
         <Scene key = "signup" component = {SignUp}  />
         <Scene key = "home" component = {TabNavigatorComponent}  />
         <Scene key = "pageUser" component = {TabNavigatorUser}  />

      </Scene>
     
   </Router>
)
export default Routes