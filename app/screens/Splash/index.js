'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/actions'

const { width, height } = Dimensions.get('window');

export class Home extends Component{

    constructor(props){
        super(props);
        this.state = {

        };
    };

    render(){
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                <Image source={require('../../resources/image/logo.png')} style={styles.image} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('auth')}>
                    <Image source={require('../../resources/image/box.png')} style={styles.button} />
                </TouchableOpacity>
            </View>
        
        );
    };
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: width,
        height: height + 20,
        resizeMode: 'contain'
    },
    button: {
        width: 60,
        height: 60,
        marginBottom: 60,
        resizeMode: 'stretch'
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        welcome: state.welcome
    }
}, mapDispatchToProps)(Home);
