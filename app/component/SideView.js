'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component, PropTypes} from 'react';
import {Text, View, Image, StyleSheet, Platform, TouchableOpacity, Animated, Dimensions, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux/actions'
import fonts from '../lib/fonts'

import colors from '../lib/colors'

const MenuData1 = [
    {
        id: 1,
        title: 'Store Setup',
        ico: 'ios-home-outline'
    },
    {
        id: 2,
        title: 'Invoice Setup',
        ico: 'logo-buffer'
    },
    {
        id: 3,
        title: 'Inventory',
        ico: 'ios-apps-outline'
    },
    {
        id: 4,
        title: 'People',
        ico: 'ios-person-outline'
    },
    {
        id: 5,
        title: 'Promotions',
        ico: 'ios-pricetag-outline'
    },
    {
        id: 6,
        title: 'Scan / Add Items',
        ico: 'ios-qr-scanner-outline'
    },
]
const MenuData2 = [
    {
        id: 7,
        title: 'FAQ',
        ico: 'ios-alert-outline'
    },
    {
        id: 8,
        title: 'My Account',
        ico: 'ios-person-outline'
    },
    {
        id: 9,
        title: 'Log Out',
        ico: 'ios-log-out-outline'
    }
]

export class SideView extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            photo: require('../resources/image/person.png')
        };
    };

    static propTypes = {
        onSelectItem: PropTypes.func.isRequired,
        selected: PropTypes.number.isRequired
    }

    static defaultProps = {
        onSelectItem: () => undefined,
    }

    render(){
        const _this = this
        const {userInfo} = this.props
        return(
            <Image source={require('../resources/image/side_back.png')} style={styles.background}>
            <View style={styles.container}>                
                <View style={styles.topView}>
                    <Text style={styles.name}>{userInfo.firstName + ' ' + userInfo.lastName}</Text>
                    <Text style={styles.phone}>{'+65 ' + userInfo.phone}</Text>
                    <Image source={this.state.photo} style={styles.photo} />
                </View>
                {
                    this.props.userInfo.uid !== undefined?
                    <View style={{flex: 1}}>
                        <View style={styles.middleView}>
                        {
                            MenuData1.map(function(menu, index){
                                return(
                                    <TouchableOpacity onPress={() => _this.props.onSelectItem(menu.id)} key={index}>
                                        <View style={styles.menuItem}>
                                            <View style={{width: 25}}><Icon name={menu.ico} size={25} color={colors.lightwhite} /></View>
                                            <View>
                                                <Text style={[styles.menuText, {color: _this.props.selected == menu.id ? colors.darkGold : colors.lightwhite}]}>
                                                {menu.title}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                        <View style={styles.bottomView}>
                        {
                            MenuData2.map(function(menu, index){
                                return(
                                    <TouchableOpacity onPress={() => _this.props.onSelectItem(menu.id)} key={index}>
                                        <View style={styles.menuItem}>
                                            <View style={{width: 25}}><Icon name={menu.ico} size={25} color={colors.lightwhite} /></View>
                                            <View>
                                                <Text style={[styles.menuText, {color: _this.props.selected == menu.id ? colors.darkGold : colors.lightwhite}]}>
                                                {menu.title}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                    </View>
                    :null
                }                
            </View>
            </Image>
        );
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.text,
        marginTop: Platform.OS == 'ios' ? -20 : 0,
        borderColor: colors.gray,
        borderWidth: 0,
        opacity: 0.95
    },
    background: {
        flex: 1,
        resizeMode: 'cover'
    },
    topView: {
        marginTop: 80,
        flexDirection: 'column',
        height: 60,
        paddingLeft: 80,        
        justifyContent: 'center',
        position: 'relative',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    menuText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
        fontFamily: fonts.beilling,
        fontWeight: 'bold'
    },
    photo: {
        position: 'absolute',
        top: 0,
        left: 10,
        width: 60,
        height: 60,
        resizeMode: 'stretch',
        borderRadius: 30
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.lightwhite,
        fontFamily: fonts.beilling
    },
    phone: {
        marginTop: 10,
        fontSize: 14,
        color: colors.lightwhite,
        fontFamily: fonts.beilling
    },
    middleView: {
        flex: 1,
        paddingLeft: 10,
        paddingTop: 60
    },
    bottomView: {
        height: 150,
        paddingLeft: 10,
        borderTopWidth: 1,
        borderColor: colors.lightGray,
        justifyContent: 'center'
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        userInfo: state.userInfo
    }
}, mapDispatchToProps)(SideView);
