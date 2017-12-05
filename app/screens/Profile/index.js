'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions, Platform} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons';
import { ActionCreators } from '../../redux/actions'
import {Content, Container} from 'native-base'
import NavBar from '../../component/NavBar'
import colors from '../../lib/colors'
import ProfileImage from '../../component/ProfileImage'
import EditableTextInput from '../../component/EditableTextInput'
const { width, height } = Dimensions.get('window');

export class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        };
    };

    componentDidMount() {
        const {userInfo} = this.props
        this.setState({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email == '' ? 'No email' : userInfo.email,
            phone: userInfo.phone,
            location: (userInfo.location == undefined || userInfo.location.text == undefined) ? '' : userInfo.location.text
        })
    }

    render(){
        const {userInfo} = this.props
        return(
            <Container>
                <NavBar 
                    title='My Account' 
                    onMenuButtonPress={() => this.props.onMenuClick()} 
                    rightIconName={this.state.rightIcon} 
                    onRightClick={() => this.setState({editable: true})}
                />
                <View style={styles.contentView}>
                    <Content contentContainerStyle={styles.content}>
                        <View style={styles.topView}>
                            <TouchableOpacity onPress={() => this.onChangePhoto()}>
                                <ProfileImage userId={userInfo.uid} handle={this.props} size={120}/>
                            </TouchableOpacity>
                            <Text style={styles.name}>{userInfo.firstName + ' ' + userInfo.lastName}</Text>
                            <Text style={styles.email}>{this.state.email}</Text>
                        </View>
                        <View style={styles.profileView}>
                            <View style={styles.profileTitleView}>
                                <Text style={[styles.profileTitle, {paddingLeft: 0, paddingRight: 10}]}>Personal Info</Text>
                                <Icon name='ios-information-circle-outline' size={20} color={colors.gray} />

                            </View>
                            <Text style={styles.profileTitle}>First Name</Text>
                            <EditableTextInput
                                text={this.state.firstName}
                                onChange={(text) => this.setState({firstName: text})}
                            />
                            <Text style={styles.profileTitle}>Last Name</Text>
                            <EditableTextInput
                                text={this.state.lastName}
                                onChange={(text) => this.setState({lastName: text})}
                            />
                            <Text style={styles.profileTitle}>Email</Text>
                            <EditableTextInput
                                text={this.state.email}
                                onChange={(text) => this.setState({email: text})}
                            />
                            <Text style={styles.profileTitle}>Phone Number</Text>
                            <EditableTextInput
                                text={this.state.phone}
                                onChange={(text) => this.setState({phone: text})}
                            />
                            <Text style={styles.profileTitle}>Location</Text>
                            <EditableTextInput
                                text={this.state.location}
                                onChange={(text) => this.setState({location: text})}
                            />
                        </View>
                    </Content>
                </View>
            </Container>        
        );
    };
}

const styles = StyleSheet.create({
    photo: {        
        width: 60,
        height: 60,
        borderRadius: Platform.OS == 'ios' ? 30 : 60,
        resizeMode: 'cover'
    },
    button: {
        width: 60,
        height: 60,
        marginBottom: 60,
        resizeMode: 'stretch'
    },
    contentView: {
        flex: 1,
        backgroundColor: colors.blue
    },
    topView: {
        backgroundColor: colors.blue,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        backgroundColor: 'white',
    },
    name: {
        fontSize: 20,
        color: colors.lightwhite,
        backgroundColor: 'transparent',
        padding: 10
    },
    email: {
        fontSize: 16,
        color: colors.lightwhite,
        backgroundColor: 'transparent'
    },
    profileView: {
        paddingBottom: 300
    },
    profileTitleView: {
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 20
    },
    profileTitle: {
        paddingVertical: 10,
        fontSize: 12,
        color: colors.gray,
        backgroundColor: 'transparent',
        paddingLeft: 20      
    },
    textInput: {
        height: 40,
        backgroundColor: 'transparent',
        paddingBottom: 10,
        color: colors.text,
        fontSize: 16,
        paddingLeft: 20 
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        welcome: state.welcome,
        userInfo: state.userInfo
    }
}, mapDispatchToProps)(Profile);
