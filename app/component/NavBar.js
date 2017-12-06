'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component, PropTypes} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../lib/colors'
import fonts from '../lib/fonts'
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

export class NavBar extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
        };
    };    

    static propTypes = {
        title: PropTypes.string.isRequired,
        onMenuButtonPress: PropTypes.func.isRequired,
        rightIconName: PropTypes.string,
        onRightClick: PropTypes.func
    }

    static defaultProps = {
        onMenuButtonPress: () => undefined,
        onRightClick: () => undefined,
        rightIconName: ''
    }

    render(){
        return(
            <View style={styles.navBar}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => this.props.onMenuButtonPress()}>
                            <Ionicons name='md-menu' color='white' size={25} />
                    </TouchableOpacity>
                    <View><Text style={styles.title}>{this.props.title}</Text></View>
                    <View>
                    {
                        this.props.rightIconName == ''?null
                        :
                        <TouchableOpacity onPress={() => this.props.onCallClick()} style={styles.callButton}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Ionicons name={this.props.rightIconName} color='white' size={25} />
                            </View>
                        </TouchableOpacity>
                    }
                    </View>                    
                </View>
            </View>
        );
    };
}


const styles = StyleSheet.create({
    navBar: {
        height: Platform.OS == 'ios' ? 80 : 60,
        paddingTop: 20,
        marginTop: Platform.OS == 'ios' ? -20 : 0,
        backgroundColor: colors.blue
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 10,
        paddingTop: Platform.OS == 'ios' ? 20 : 0,
    },

    menuButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fonts.beilling
    },

    callButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default NavBar;