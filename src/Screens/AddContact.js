import React, { Component } from 'react';
import { StatusBar, AsyncStorage, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Icon, Picker, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import { addContact } from '../publics/redux/actions/users';
import { connect } from 'react-redux'

class AddContact extends Component {

  constructor() {
    super();
    this.state = {
      gender: 'MALE',
      firstName: null,
      lastName: null,
      email: null,
      avatar: null,
      errFirstName: false,
      errLastName: false,
      errEmail: false,
      errAvatar: false,
      modalVisible: false,
    };
  }

  onPressCreate = async (visible) => {

    if (this.state.firstName == null || this.state.firstName == '') {
      this.setState({
        errFirstName: 'first name cannot null'
      })
    }
    else if (this.state.lastName == null || this.state.lastName == '') {
      this.setState({
        errLastName: 'last name cannot null'
      })
    }
    else if (this.state.email == null || this.state.email == '') {
      this.setState({
        errEmail: 'email cannot null'
      })
    }
    else if (this.state.avatar == null || this.state.avatar == '') {
      this.setState({
        errAvatar: 'avatar cannot null'
      })
    }
    else {
      let token = await AsyncStorage.getItem('token')
      await this.props.dispatch(addContact(token, this.state.first_name, this.state.last_name, this.state.email, this.state.gender, this.state.avatar))
        .then(() => {
          this.props.navigation.navigate('Contact')
        })
        .catch(
          function (error) {
            this.setState({ modalVisible: visible });
          })
    }
  };

  onChangeTextEmail = email => this.setState({ email, errEmail: false });
  onChangeTextFirstName = firstName => this.setState({ firstName, errFirstName: false });
  onChangeTextLastName = lastName => this.setState({ lastName, errLastName: false });
  onChangeTextAvatar = avatar => this.setState({ avatar, errAvatar: false });

  onValueChange(value) {
    this.setState({
      gender: value
    });
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Add Contact',
    headerTintColor: 'white',
    headerTitleStyle: {
      width: '75%',
      textAlign: 'center',
      color: 'white'
    },
    headerStyle: {
      backgroundColor: '#ff6633'
    },
  })

  render() {
    return (
      <ScrollView>
        <Container style={{ flex: 1, }}>
          <StatusBar barStyle="light-content" backgroundColor="#ff6633" />
          <Content style={{ backgroundColor: '#ff9980' }}>
            <Modal
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View style={styles.modalView}>
                <TouchableOpacity onPress={() => { this.setState({ modalVisible: !this.state.modalVisible }) }}>
                  <View style={{ elevation: 20, backgroundColor: '#ff6633', borderRadius: 10 }}>
                    <View style={{ padding: '10%' }}>
                      <Item style={{ alignSelf: 'center', borderColor: 'transparent' }}>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>Add Contact Failed</Text>
                      </Item>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            <Form style={{ alignItems: 'center' }}>
              <Item rounded style={
                styles.styleItem
              }>
                <Input
                  placeholder="First Name"
                  onChangeText={this.onChangeTextFirstName}
                  placeholderTextColor='white'
                  style={styles.styleInput} />
              </Item>
              {
                this.state.errFirstName !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errFirstName}</Text> : null
              }
              <Item rounded style={
                styles.styleItem
              }>
                <Input
                  placeholder="Last Name"
                  onChangeText={this.onChangeTextLastName}
                  placeholderTextColor='white'
                  style={styles.styleInput} />
              </Item>
              {
                this.state.errLastName !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errLastName}</Text> : null
              }
              <Item rounded style={styles.styleItem}>
                <Input
                  placeholder="Email"
                  placeholderTextColor='white'
                  onChangeText={this.onChangeTextEmail}
                  style={styles.styleInput} />
              </Item>
              {
                this.state.errEmail !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errEmail}</Text> : null
              }
              <Item rounded style={styles.styleItem}>
                <Label style={{ color: 'white' }}>Gender : </Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon style={{ color: 'white' }} name="md-arrow-dropdown" />}
                  placeholder="Select Gender"
                  placeholderStyle={{ color: "white" }}
                  placeholderIconColor="white"
                  style={{ width: undefined }}
                  selectedValue={this.state.gender}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Male" color='#ff6633' value="MALE" />
                  <Picker.Item label="Female" color='#ff6633' value="FEMALE" />
                </Picker>
              </Item>
              <Item rounded style={styles.styleItem}>
                <Input
                  placeholder="Avatar Url"
                  placeholderTextColor='white'
                  style={styles.styleInput}
                  value={this.state.avatar}
                  onChangeText={this.onChangeTextAvatar}
                />
              </Item>
              {
                this.state.errAvatar !== false ? <Text style={{ marginTop: 10, marginLeft: 5, color: '#ff0000' }}>{this.state.errAvatar}</Text> : null
              }
              <Button
                onPress={() => { this.onPressCreate(!this.state.modalVisible) }}
                style={{
                  justifyContent: 'center', alignSelf: 'center', width: '70%',
                  marginVertical: 10,
                  paddingHorizontal: 16,
                  backgroundColor: '#ff6633'
                }}
                rounded >
                <Text style={{ fontWeight: 'bold' }} >Save</Text>
              </Button>
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
  }
});

const mapStateToProps = state => {
  return {
    contacts: state.users.contacts,
  }
}

export default connect(mapStateToProps)(AddContact);
