'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/actions'
import { Container, Content } from 'native-base';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../lib/colors'
import Toast, {DURATION} from 'react-native-easy-toast'
import { NavigationActions } from 'react-navigation'
export class Auth extends Component{

    constructor(props){
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.state = {
            number: '351265805126',
            step: 'login',
            loading: false
        };
    };

    verify() {
        this.setState({loading: true})
        this.props.sendVerificationCode(this.state.number, (res) => {
            this.setState({loading: false})
            if(res == 'success'){
                this.setState({step: 'confirm'})
            }
            else{
                alert(res)
            }
        })
    }

    onRegister() {
        this.setState({loading: true})
        const {firstName, lastName, number} = this.state
        this.props.register(firstName, lastName, number, (res) => {
            this.setState({loading: false})
            if(res == 'success') {
                this.setState({step: 'login'})
                this.resetToHome()
            }
            else alert(res)
        })
    }

    onConfirmCode() {
        this.setState({loading: true})
        this.props.confirmVerificationCode(this.state.number, this.state.code, (res) => {
            this.setState({loading: false})
            if(res == 'success'){
                this.setState({step: 'login'})
                this.resetToHome()
            }
            else{
                this.setState({step: 'signup'})
            }
        })
    }

    resendCode() {
        this.props.resendCode((res) => {
            this.refs.toast.show('Code has been sent again', DURATION.LENGTH_LONG);
        })
    }

    resetToHome() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'home', params: {}})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render(){
        return(
            <Container>
                {
                    this.state.step == 'login'?
                    <View style={styles.container}>
                        <View style={styles.pNumberView}>
                            <Text style={styles.pCode}>+65</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.inputNumber}
                                    value={this.state.number}
                                    onChangeText={(text) => this.setState({number: text})}
                                    placeholder="Phone number"
                                    underlineColorAndroid="transparent"
                                    keyboardType='phone-pad'
                                    maxLength={10}
                                />
                            </View>
                        </View>
                        <View>
                            <Button 
                                style={styles.sendButton}
                                isDisabled = {this.state.loading}
                                isLoading = {this.state.loading}
                                activityIndicatorColor = 'white'
                                onPress={() => this.verify()}>
                                <Text style={styles.sendText}>Verify</Text>
                            </Button>
                        </View>
                    </View>
                    :this.state.step == 'signup'?
                    <Content contentContainerStyle={styles.signupView}>
                        <View>
                        <TextInput
                            style={styles.signupInput}
                            value={this.state.firstName}
                            onChangeText={(text) => this.setState({firstName: text})}
                            placeholder="first name"
                            underlineColorAndroid="transparent"
                            maxLength={20}
                        />
                        </View>
                        <View>
                        <TextInput
                            style={styles.signupInput}
                            value={this.state.lastName}
                            onChangeText={(text) => this.setState({lastName: text})}
                            placeholder="last name"
                            underlineColorAndroid="transparent"
                            maxLength={20}
                        />
                        </View>
                        <View>
                            <Button 
                                style={styles.sendButton}
                                isDisabled = {this.state.loading}
                                isLoading = {this.state.loading}
                                activityIndicatorColor = 'white'
                                onPress={() => this.onRegister()}>
                                <Text style={styles.sendText}>Register</Text>
                            </Button>
                        </View>
                    </Content>
                    :this.state.step='confirm'?
                    <View style={styles.container}>
                        <View style={styles.topView}>
                            <TouchableOpacity style={styles.backView} onPress={() => this.setState({step: 'login'})}>
                                <Icon name='ios-arrow-round-back-outline' size={25} color={colors.lightwhite} />
                                <Text style={styles.topText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.backView} onPress={() => this.resendCode()}>
                                <Text style={styles.topText}>Resend</Text>
                                <Icon name='ios-send-outline' size={25} color={colors.lightwhite} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TextInput
                                style={styles.inputCode}
                                value={this.state.code}
                                onChangeText={(text) => this.setState({code: text})}
                                placeholder="code"
                                underlineColorAndroid="transparent"
                                maxLength={4}
                            />
                        </View>
                        <View>
                            <Button 
                                style={styles.sendButton}
                                isDisabled = {this.state.loading}
                                isLoading = {this.state.loading}
                                activityIndicatorColor = 'white'
                                onPress={() => this.onConfirmCode()}>
                                <Text style={styles.sendText}>Confirm</Text>
                            </Button>
                        </View>
                        <Text style={styles.notifyText}>Verification code has been sent to your mobile phone. Please check your message to confirm here.</Text>
                    </View>
                    :null
                }          
                <Toast
                    ref="toast"
                    style={{backgroundColor:colors.green, marginHorizontal: 20}}
                    position='bottom'
                    positionValue={100}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    textStyle={{color:'white', fontSize: 16, textAlign: 'center'}}
                />          
            </Container>        
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        paddingTop: 150,
        flex: 1,
        alignItems: 'center'
    },
    pNumberView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 280,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: colors.lightwhite,
        marginTop: 15,
        height: 60
    },
    pCode: {
        color: colors.text,
        fontSize: 20,
    },
    inputView: {
        flex: 1, 
        borderLeftWidth: 2, 
        borderColor: colors.text,
        marginLeft: 5,
        height: 50,
    },
    inputNumber: {
        flex: 1,
        height: 50,
        fontSize: 20,
        marginLeft: 10,
        color: colors.text,
    },
    inputCode: {
        height: 60,
        width: 200,
        padding: 10,
        color: colors.text,
        fontSize: 20,
        margin: 5,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: colors.lightwhite
    },
    sendButton: {
        backgroundColor: colors.blackBlue,        
        width: 200,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        borderWidth: 0,
        marginTop: 30
    },
    sendText: {
        fontSize: 20,
        color: colors.lightwhite,
        textAlign: 'center'
    },
    bottomView: {
        position: 'absolute',
        bottom: 60,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bottomText: {
        color: 'yellow',
        fontSize: 20,
        textAlign: 'center'
    },
    signupView: {
        alignItems: 'center',
        paddingTop: 120,
        backgroundColor: colors.blue,
        flex: 1
    },
    signupInput: {
        height: 50,
        width: 280,
        borderRadius: 10,
        backgroundColor: colors.lightwhite,
        fontSize: 20,
        color: colors.text,
        marginTop: 15,
        paddingHorizontal: 10
    },
    topView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        padding: 10
    },
    backView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    topText: {
        color: colors.lightwhite,
        fontSize: 20,
        backgroundColor: 'transparent',
        padding: 10
    },
    notifyText: {
        color: 'yellow',
        fontSize: 20,
        backgroundColor: 'transparent',
        padding: 50,
        textAlign: 'center'
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        welcome: state.welcome
    }
}, mapDispatchToProps)(Auth);
