import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { login } from '../publics/redux/actions/users';
import { connect } from 'react-redux'

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      modalVisible: false,
    };
  }

  onPressLogin(visible) {
    this.props.dispatch(login(this.state.username, this.state.password)).then(() => {
      this.props.navigation.navigate('App')
    })
      .catch(
        function (error) {
          this.setState({ modalVisible: visible });
        })
  };

  onChangeTextUsername = username => this.setState({ username });
  onChangeTextPassword = password => this.setState({ password });

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Welcome',
    header: null,
    headerTitleStyle: {
      width: '95%',
      textAlign: 'center',
      color: 'white'
    },
    headerStyle: {
      elevation: null,
      backgroundColor: '#e62e00'
    },
  })

  render() {
    return (
      <ScrollView>
        <Container style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="#ff6633" />
          <Content style={{ backgroundColor: '#ff9980' }}>
            <Text style={{ alignSelf: 'center', marginTop: '5%', fontWeight: 'bold', color: 'white', fontSize: 20 }}>Tonjoo Test</Text>
            <Image
              source={require('../Images/tonjoo-favicon.png')}
              style={{ alignSelf: 'center', marginTop: '5%' }}
            />
            <Modal
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View style={styles.modalView}>
                <TouchableOpacity onPress={() => { this.setState({ modalVisible: !this.state.modalVisible }) }}>
                  <View style={{ elevation: 20, backgroundColor: '#ff6633', borderRadius: 10 }}>
                    <View style={{ padding: '10%' }}>
                      <Item style={{ borderColor: 'transparent', alignSelf: 'center' }}>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>Login Failed, Check Username and Password</Text>
                      </Item>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            <Form style={{ alignItems: 'center' }}>
              <KeyboardAvoidingView style={{
                margin: 20,
                padding: 20,
                alignSelf: "stretch"
              }}>
                <Item rounded style={styles.styleItem}>
                  <Input
                    placeholder="Username"
                    placeholderTextColor='white'
                    style={styles.styleInput}
                    value={this.state.username}
                    onChangeText={this.onChangeTextUsername}
                  />
                </Item>
                <Item rounded style={styles.styleItem}>
                  <Input
                    placeholder="Password"
                    placeholderTextColor='white'
                    secureTextEntry={true}
                    style={styles.styleInput}
                    onChangeText={this.onChangeTextPassword}
                  />
                </Item>
                <Button
                  onPress={() => { this.onPressLogin(!this.state.modalVisible) }}
                  style={styles.buttonStyle}
                  rounded dark>
                  <Text style={{ fontWeight: 'bold' }}>Login</Text>
                </Button>
              </KeyboardAvoidingView>
            </Form>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  styleItem: {
    marginVertical: 10,
    paddingHorizontal: 16,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffad99'
  },
  styleInput: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
    position: 'relative',
  },
  buttonStyle: {
    justifyContent: 'center', alignSelf: 'center', width: '40%',
    marginVertical: 10,
    paddingHorizontal: 16,
    marginRight: '5%',
    backgroundColor: '#ff6633'
  },
})

const mapStateToProps = state => {
  return {
    contacts: state.users.contacts,
  }
}

export default connect(mapStateToProps)(Login);