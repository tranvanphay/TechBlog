import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomePageUser from './HomePageUser';
import TransactionHistoryComponent from './InfoUser';
import React, { Component } from 'react';
  let routeConfigs = {
    'Home': {
      screen: HomePageUser,
    },
    'Transaction': {
      screen: TransactionHistoryComponent,
    },
   
  };
  



let tabNavigatorConfig = {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: 'blue',
    labelStyle: {
      fontSize: 13,
    },
    style: {
      backgroundColor: 'lightgray',
      padding: -10
    },
  },
  order: ['Home', 'Transaction'],
};

 const AppNavigator = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);
 export const TabNavigator = createAppContainer(AppNavigator)
 export default class TabNavigatorComponent extends Component {
  static navigationOptions = {
    header: null ,
  };
  render() {
    return (
      <TabNavigator/>
    );
  }
}