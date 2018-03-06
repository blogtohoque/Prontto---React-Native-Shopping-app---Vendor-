'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component, PropTypes} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../lib/colors'
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height
import { WaveIndicator } from 'react-native-indicators';
export class ProductImage extends React.Component{
    

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
        this.props.handle.getProductImage(this.props.image, (data) => {
            this.mounted && this.setState({photo: {uri: data}})
        })
    }

    componentWillUnmount() {
        this.mounted = false
    }

    static propTypes = {
        handle: PropTypes.object.isRequired,
        image: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired
    }

    static defaultProps = {

    }

    render(){
        const {size, source} = this.props
        const photoStyle={
            width: size,
            height: size,
            resizeMode: 'cover',
            borderRadius: 5
        }
        const loadingViewStyle = {
            width: size, 
            height: size, 
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
        }
        return(
            source !== undefined && source != null?
            <Image source={source} style={photoStyle}/>
            :this.state.photo == null?
            <View style={loadingViewStyle}>
                <WaveIndicator color={colors.blue} waveMode='outline' size = {this.props.size / 2}/>
            </View>
            :<Image source={this.state.photo} style={photoStyle} />
        );
    };
}

const styles = StyleSheet.create({
    
})

export default ProductImage;