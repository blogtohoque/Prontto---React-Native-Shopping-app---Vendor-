'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Text, Alert, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/actions'
import Camera from 'react-native-camera';
import NavBar from '../../component/NavBar'

export class Scanner extends Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            
        };
    }

    onBarCodeRead(e){
        this.setState({type: e.type, data: e.data})
        this.props.searchProduct(e.data, (res) => {
            if(res == {}){
                
            }
        })
    }

    render() {

        return (
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <NavBar title='Scan / Add Item' onMenuButtonPress={() => this.props.onMenuClick()}/>
                {
                    this.state.step == 'scanned_new'?
                    <View style={{flex: 1}}>
                        <Text style={styles.small}>Product ID</Text>
                        <Text style={styles.data}>{this.state.data}</Text>
                    </View>
                    :this.state.step == 'scanned_exist'?
                    <ScrollView style={{flex: 1}}>
                        {

                        }
                    </ScrollView>
                    :
                    <View style={{flex: 1, position: 'relative'}}>
                        <Camera
                            ref={(cam) => {
                                this.camera = cam;
                            }}
                            style={{flex: 1}}
                            aspect={Camera.constants.Aspect.fill}
                            onBarCodeRead={(e) => this.onBarCodeRead(e)}
                        />
                        <View style={styles.cover}>
                            <View style={{flex: 0.3, opacity: 0.7, backgroundColor: 'white'}} />
                            <View style={{flex: 0.4, flexDirection: 'row'}}>
                                <View style={{flex: 0.2, opacity: 0.7, backgroundColor: 'white'}} />
                                <View style={{flex: 0.6, opacity: 0, backgroundColor: 'transparent'}} />
                                <View style={{flex: 0.2, opacity: 0.7, backgroundColor: 'white'}} />
                            </View>
                            <View style={{flex: 0.3, opacity: 0.7, backgroundColor: 'white'}} />
                        </View>
                    </View>
                }                
            </View>
        )
    }

    componentDidMount() {

    }

    componentWillUnmount () {

    }
}

const styles = StyleSheet.create({
    navBar: {
        height: 70,
        backgroundColor: '#FAFAFA',
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 10
    },

    title: {
        color: 'blue',
        fontSize: 24,
        textAlign: 'center',
    },
    backText: {
        color: 'black'
    },
    cover: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    dataView: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    small: {
        fontSize: 12,
        color: 'blue',
        fontWeight: 'bold',
        paddingBottom: 5,
        paddingTop: 15,
        backgroundColor: 'transparent'
    },
    data: {
        color: 'black',
        fontSize: 22,
        padding: 5,
        backgroundColor: 'transparent'
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        r_welcome: state.welcome
    }
}, mapDispatchToProps)(Scanner);
