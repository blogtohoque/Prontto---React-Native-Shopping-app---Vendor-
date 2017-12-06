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
            photo: null,
            mWidth: new Animated.Value(0),
            mHeight: new Animated.Value(0)
        };
    };

    componentDidMount() {
        const _this = this
        this.mounted = true
        this.startAnimation()
        setTimeout(function() {
            if(_this.mounted){
              _this.setState({mWidth: new Animated.Value(0), mHeight: new Animated.Value(0)})
              _this.startAnimation()
            }
        }, 2000)
        this.props.handle.getImage(this.props.userId, (data) => {
            if(data == null){
                this.mounted && this.setState({photo: require('../resources/image/person.png')})
            }
            else{
                this.mounted && this.setState({photo: {uri: data}})
            }
        })
    }

    startAnimation() {
        const _this = this
        Animated.timing(
          _this.state.mWidth,
          {
            toValue: this.props.size,
            duration: 2000
          }
        ).start()
    
        Animated.timing(
          _this.state.mHeight,
          {
            toValue: this.props.size,
            duration: 2000
          }
        ).start()    
    }

    componentWillUnmount() {
        this.mounted = false
    }

    static propTypes = {
        handle: PropTypes.object.isRequired,
        userId: PropTypes.string.isRequired,
        source: PropTypes.object,
        size: PropTypes.number.isRequired
    }

    static defaultProps = {
        userId: '',
    }

    render(){
        const {size, source} = this.props
        const photoStyle={
            width: size,
            height: size,
            borderRadius: Platform.OS == 'ios' ? size / 2 : size,
            resizeMode: 'cover'
        }
        const loadingViewStyle = {
            width: size, 
            height: size, 
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.lightwhite,
            borderRadius: Platform.OS == 'ios' ? size / 2 : size,
            overflow: 'hidden'
        }
        return(
            source !== undefined && source != null?
            <Image source={source} style={photoStyle}/>
            :this.state.photo == null?
            <View style={loadingViewStyle}>
                <Animated.View 
                    style={{
                        width: this.state.mWidth, 
                        height: this.state.mHeight, 
                        backgroundColor: colors.green,
                        borderRadius: 120,
                        opacity: 0.5
                    }} 
                />
            </View>
            :<Image source={this.state.photo} style={photoStyle} />
        );
    };
}

const styles = StyleSheet.create({
    
})

export default ProfileImage;