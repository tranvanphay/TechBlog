import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeComponent from './HomeComponent';
import PostComponent from './PostComponent';
import TransactionHistoryComponent from './InfoComponent';
import React, { Component } from 'react';
  let routeConfigs = {
    'Home': {
      screen: HomeComponent,
    },
    'Promotion': {
      screen: PostComponent,
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
  order: ['Home', 'Promotion', 'Transaction'],
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