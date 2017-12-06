'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions, Platform} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons';
import { ActionCreators } from '../../redux/actions'
import * as firebase from 'firebase'
import {Content, Container} from 'native-base'
import NavBar from '../../component/NavBar'
import colors from '../../lib/colors'
import fonts from '../../lib/fonts'
import ProfileImage from '../../component/ProfileImage'
import MyButton from '../../component/Button'
import EditableTextInput from '../../component/EditableTextInput'
import Button from 'apsl-react-native-button';
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const { width, height } = Dimensions.get('window');
var ImagePicker = require('react-native-image-picker');

export class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false,
            avatarSource: null,
            changeImage: false,
            imageUrl: ''
        };
    };

    componentDidMount() {
        const {userInfo} = this.props
        this.setState({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            phone: userInfo.phone,
            location: (userInfo.location == undefined || userInfo.location.text == undefined) ? '' : userInfo.location.text
        })

    }

    checkValidation() {
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailReg.test(this.state.email)){
            alert('Invalid email address');
            return false
        }
        return true
    }

    onSaveProfile() {
        if(!this.checkValidation()) return
        this.setState({loading: true});
        const {firstName, lastName, photo, email, phone, location, avatarSource, changeImage} = this.state
        let param = {
            firstName,
            lastName,
            photo: this.props.userInfo.photo,
            email,
            phone,
            location: {
                text: location
            },
            uid: this.props.userInfo.uid
        }
        if(changeImage){
            let rnfbURI = RNFetchBlob.wrap(this.state.imageUrl);
            let filename = 'avatar_' + this.props.userInfo.uid + '.jpg';
            // create Blob from file path
            Blob.build(rnfbURI, { type : 'image/jpg;'})
            .then((blob) => {
              // upload image using Firebase SDK
                return  firebase.storage()
                        .ref('profile')
                        .child(filename)
                        .put(blob, { contentType : 'image/jpg' })
                        .then((snapshot) => {                             
                            this.setState({loading: false})
                            param['photo'] = filename
                            this.props.saveProfile(param, (res) => {
                                if(res == 'success'){
                                    alert('Saved successfully!');     
                                }
                                else{
                                    alert(res)
                                }
                            })
                        });
            })
            .catch(error => {
                this.setState({loading: false});
                alert(error.toString())
            })
        }
        else{
            this.props.saveProfile(param, (res) => {
                this.setState({loading: false})
                if(res == 'success'){
                    alert('Saved successfully!');     
                }
                else{
                    alert(res)
                }
            })
        }
        
    }

    onChangePhoto() {
        var options = {
            title: 'Select Avatar',
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.5,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
        
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                if (Platform.OS === 'android') {
                    source = { uri: response.uri };
                    this.setState({imageUrl: response.uri});
                } else {
                    source = { uri: response.uri.replace('file://', '') };
                    this.setState({imageUrl: response.uri.replace('file://', '')});
                }
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                this.setState({
                    avatarSource: source,
                    changeImage: true
                });
            }
        });
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
                                <ProfileImage 
                                    source={this.state.avatarSource} 
                                    userId={userInfo.uid} 
                                    handle={this.props} 
                                    size={120}
                                    onImageChang
                                />
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
                        <MyButton text='Save' bottom={80} onPress={() => this.onSaveProfile()} loading = {this.state.loading}/>
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
        backgroundColor: colors.blue,
        justifyContent: 'center'
    },
    topView: {
        backgroundColor: colors.blue,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    name: {
        fontSize: 20,
        color: colors.lightwhite,
        backgroundColor: 'transparent',
        padding: 10,
        fontFamily: fonts.beilling
    },
    email: {
        fontSize: 16,
        color: colors.lightwhite,
        backgroundColor: 'transparent',
        fontFamily: fonts.beilling
    },
    profileView: {
        paddingBottom: 50
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
        fontSize: 14,
        color: colors.gray,
        backgroundColor: 'transparent',
        paddingLeft: 20,
        fontFamily: fonts.beilling   
    },
    saveButton: {
        backgroundColor: colors.blue,
        padding: 20,
        justifyContent: 'center',
        marginHorizontal: 80,
        borderWidth: 0,
        marginBottom: 80
    },
    saveText: {
        textAlign: 'center',
        color: colors.lightwhite,
        backgroundColor: 'transparent',
        fontSize: 20
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
