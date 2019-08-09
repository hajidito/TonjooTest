import React from 'react';
import { View, Text, Image } from 'react-native';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('AuthLoading');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          source={require('../Images/tonjoo-favicon.png')}
          style={{ alignSelf: 'center' }}
        />

      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9980'
  },
}

export default SplashScreen;