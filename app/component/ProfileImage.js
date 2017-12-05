'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component, PropTypes} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../lib/colors'
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

export class ProfileImage extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            photo: null
        };
    };

    componentDidMount() {
        this.props.handle.getImage(this.props.userId, (url) => {
            if(url !== ''){

            }
        })
    }

    static propTypes = {
        handle: PropTypes.object.isRequired,
        userId: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired
    }

    static defaultProps = {
        userId: '',
    }

    render(){
        const photoStyle={
            width: this.props.size,
            height: this.props.size,
            borderRadius: Platform.OS == 'ios' ? this.props.size / 2 : this.props.size,
            resizeMode: 'cover'
        }
        return(
            this.state.photo == null?
            <Image source={require('../resources/image/person.png')} style={photoStyle}/>
            :<Image source={this.state.photo} style={photoStyle} />
        );
    };
}

export default ProfileImage;