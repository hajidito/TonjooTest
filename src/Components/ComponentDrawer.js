import React, { Component } from 'react';
import { AsyncStorage, Alert, Modal, Image, SafeAreaView, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { ListItem, Text, Item, View, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

class ComponentDrawer extends Component {
    _logOut = async () => {
        Alert.alert(
            'Options',
            'Do you want to Log Out From Tonjoo Test ?',
            [
                {
                    text: 'Yes', onPress: async () => {
                        await AsyncStorage.clear();
                        this.props.navigation.navigate('Auth');
                    }
                },
                { text: 'No', onPress: () => console.log('NO Pressed'), style: 'cancel', }
            ],
            { cancelable: false },
        );
        return true;
    }

    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ff6633' }}>
                <View style={styles.profilTemplate}>
                    <TouchableOpacity>
                        <Image source={require('../Images/man.png')} style={styles.profilImage} />
                        <Text style={styles.profilName}>Tonjoo User</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    <ScrollView >
                        <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                            <ListItem >
                                <Icon name='ios-log-out' style={{ color: 'white', flex: 1 }} />
                                <Text style={styles.textIcon}>Log Out</Text>
                            </ListItem>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.modalView}>
                        <View style={{ elevation: 20, backgroundColor: '#ff9980', borderRadius: 10 }}>
                            <View style={{ padding: '10%' }}>
                                <Item style={{ borderColor: 'transparent' }}>
                                    <Text style={{ color: 'white' }}>Do you want to Log Out From Tonjoo Test ?</Text>
                                </Item>
                            </View>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <ListItem style={{ borderColor: 'transparent' }}>
                                    <TouchableHighlight onPress={async () => {
                                        await AsyncStorage.clear();
                                        this.props.navigation.navigate('Auth');
                                    }}
                                        underlayColor={'transparent'}
                                    >
                                        <Text style={{ fontSize: 15, color: 'white', right: '30%' }}>Yes</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
                                        underlayColor={'transparent'}
                                    >
                                        <Text style={{ fontSize: 15, color: 'white', left: '5%' }}>Cancel</Text>
                                    </TouchableHighlight>
                                </ListItem>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

export default withNavigation(ComponentDrawer)

const styles = StyleSheet.create({
    textIcon: {
        flex: 7,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 32,
        fontSize: 15
    },
    profilTemplate: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%'
    },
    profilImage: {
        height: 100,
        width: 101,
        borderRadius: 54,
        alignSelf: 'center',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '70%',
        position: 'relative',
    },
    profilName: {
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        paddingTop: '5%',
        fontSize: 25
    }
})