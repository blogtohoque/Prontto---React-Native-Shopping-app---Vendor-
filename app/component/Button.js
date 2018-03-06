'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component, PropTypes} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../lib/colors'
import fonts from '../lib/fonts'
import Button from 'apsl-react-native-button';
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

export class MyButton extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            
        };
    };

    static propTypes = {
        onPress: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
        width: PropTypes.number,
        loading: PropTypes.bool
    }

    static defaultProps = {
        onPress: () => undefined,
        text: '',
        loading: false,
        width: 200
    }

    render(){        
        return(
            <View style={styles.container}>
                <Button 
                    style={[styles.button, {marginBottom: this.props.bottom}]}
                    isDisabled = {this.props.loading}
                    isLoading = {this.props.loading}
                    activityIndicatorColor = 'white'
                    onPress={() => this.props.onPress()}>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </Button>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {        
        flexDirection: 'column',
        alignItems: 'center',
        width: Width
    },
    button: {
        height: 50,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: colors.blue,
        marginHorizontal: 80
    },
    buttonText: {
        fontSize: 18,
        fontFamily: fonts.beilling,
        color: colors.lightwhite
    }
})

export default MyButton;