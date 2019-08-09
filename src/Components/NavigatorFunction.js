import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import Login from '../Screens/Login';
import AuthLoading from '../Screens/AuthLoading';
import SplashScreen from '../Screens/SplashScreen';
import Contact from '../Screens/Contact';
import AddContact from '../Screens/AddContact';
import ComponentDrawer from './ComponentDrawer';
import { Provider } from 'react-redux';
import store from '../publics/redux/store';

const CustomDrawer = () => (
  <ComponentDrawer />
)

const AppStackNavigator = createStackNavigator({
  Contact: {
    screen: Contact,
  },
  AddContact: {
    screen: AddContact,
  },
});

const AppDrawerNavigator = createDrawerNavigator({
  Contact: {
    screen: AppStackNavigator,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
},
  { contentComponent: CustomDrawer }
)

const AuthStack = createStackNavigator({
  Login: {
    screen: Login
  },
});

const AppSwitchNavigator = createAppContainer(createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    AuthLoading: AuthLoading,
    App: AppDrawerNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'SplashScreen',
  }
));

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <AppSwitchNavigator />
      </Provider>
    )
  }
}