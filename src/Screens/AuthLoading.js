import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        this._bootstrapAsync();
      }),
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }

  _bootstrapAsync = async () => {
    let token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="light-content" backgroundColor="#ff6633" />
      </View>
    );
  }
}