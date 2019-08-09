import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, View, AsyncStorage } from 'react-native';
import { Container, Content, Icon, Button, Footer } from 'native-base'
import { connect } from 'react-redux'
import { contacts } from '../publics/redux/actions/users';

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listContacts: []
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Contact List',
        headerTitleStyle: {
            width: '100%',
            textAlign: 'center',
            color: 'white'
        },
        headerStyle: {
            elevation: null,
            backgroundColor: '#ff6633'
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image
                    source={require('../Images/man.png')}
                    style={styles.iconProfil}
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('AddContact')} style={{ marginRight: 20 }}>
                <Icon name='ios-add-circle' style={styles.iconSort} />
            </TouchableOpacity>
        ),
    })

    componentDidMount = async () => {
        let token = await AsyncStorage.getItem('token')
        this.props.dispatch(contacts(token)).then(() => {
            this.setState({
                listContacts: this.props.users.contacts.concat(this.props.users.addContact)
            })
        })
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.dispatch(contacts(token)).then(() => {
                    this.setState({
                        listContacts: this.props.users.contacts.concat(this.props.users.addContact)
                    })
                })
                console.warn(this.props.users.addContact)
            }),
        ]
    }

    componentWillUnmount() {
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="light-content" backgroundColor="#ff6633" />
                {
                    (this.state.listContacts == null) ?
                        <ActivityIndicator />
                        :
                        <React.Fragment>
                            <Content style={{ backgroundColor: '#ffad99' }}>
                                <FlatList
                                    data={this.state.listContacts}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity style={styles.containerContactList}>
                                                <Image source={{ uri: item.avatar }}
                                                    style={styles.imgContactList}
                                                />
                                                <View style={{ padding: 10, }}>
                                                    <Text numberOfLines={1}
                                                        style={styles.textContactList}
                                                    >{item.first_name} - {item.last_name}</Text>
                                                    <Text numberOfLines={1} style={{ fontSize: 15, color: 'white' }}>{item.gender}</Text>
                                                    <Text numberOfLines={1} style={{ fontSize: 15, color: 'white' }}>{item.email}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </Content>
                        </React.Fragment>
                }
                <Footer style={{ backgroundColor: '#ffad99' }}>
                    <Button
                        onPress={this.onPressCreate}
                        style={styles.buttonStyle}
                        rounded >
                        <Text style={{ fontWeight: 'bold', color: 'white' }} >Previous</Text>
                    </Button>
                    <Button
                        onPress={this.onPressCreate}
                        style={styles.buttonStyle}
                        rounded >
                        <Text style={{ fontWeight: 'bold', color: 'white' }} >Next</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    containerContactList: {
        backgroundColor: '#ff6649',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 5,
        marginTop: '3%',
        marginBottom: '3%',
        borderRadius: 20,
        flexDirection: 'row',
        width: '90%',
        height: 100
    },
    imgContactList: {
        width: '30%',
        height: '70%',
        alignSelf: 'center',
    },
    textContactList: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonStyle: {
        justifyContent: 'center', alignSelf: 'center', width: '40%',
        marginVertical: 10,
        paddingHorizontal: 16,
        marginRight: '5%',
        backgroundColor: '#ff6633'
    },
    iconProfil: {
        borderRadius: 50,
        marginLeft: 20,
        height: 50,
        width: 50,
        resizeMode: 'stretch'
    },
    iconSort: {
        color: 'white',
        resizeMode: 'stretch'
    },

});

const mapStateToProps = state => {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps)(Contact);