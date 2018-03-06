'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component, PropTypes} from 'react';
import {Text, Alert, View, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/actions'
import { Container, Content } from 'native-base';
import colors from '../../lib/colors'
import fonts from '../../lib/fonts'
import MyButton from '../../component/Button'
import ProductImage from '../../component/ProductImage'
import PopupDialog, { ScaleAnimation } from 'react-native-popup-dialog';
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

export class ProductList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selected: {}
        };
    }

    static propTypes = {
        onBackToScan: PropTypes.func.isRequired,
        onAddVendor: PropTypes.func.isRequired,
        productData: PropTypes.object.isRequired
    }

    static defaultProps = {
        onBackToScan: () => undefined,
        onAddVendor: () => undefined,
        productData: {}
    }

    onShowProductDetail(product) {
        this.setState({selected: product})
        this.popupDialog.show();
    }

    render() {
        const _this = this
        const {productData} = this.props
        return (
            <View style={{flex: 1, position: 'relative'}}>
                <ScrollView style={{flex: 1, backgroundColor: colors.lightGray, paddingBottom: 100}}>
                {
                    Object.keys(productData).map(function(vendorID, index){
                        const product = productData[vendorID]
                        return(
                            <TouchableOpacity onPress={() => _this.onShowProductDetail(product)} key={vendorID} style={styles.productListItem}>
                                <View style={styles.productImage}>
                                    <ProductImage image={product.image} size={90} handle={_this.props}/>
                                </View>
                                <View style={{flex: 0.4, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={styles.name}>{product.name}</Text>
                                        <Text style={styles.own}>{product.vendor_id == _this.props.userInfo.uid ? ' (OWN)' : ''}</Text>
                                    </View>
                                    <Text style={styles.price}>{'$' + product.price}</Text>
                                </View>
                                <View style={{flex: 0.6, paddingHorizontal: 10, overflow: 'hidden'}}>
                                    <Text style={styles.description}>{product.description}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
                
                </ScrollView>
                {
                    JSON.stringify(productData).indexOf(this.props.userInfo.uid) < 0?
                    <TouchableOpacity onPress={() => this.props.onAddVendor()} style={styles.addButtonView}>
                        <Image source={require('../../resources/image/add.png')} style={styles.addButtonImage}/>
                    </TouchableOpacity>
                    :null
                }                
                <PopupDialog
                    width={300}
                    height={400}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    containerStyle={{marginTop: -100}}
                >
                    {
                        this.state.selected.image !== undefined?
                        <ScrollView style={{padding: 10, flex: 1}}>
                            <View style={{alignItems: 'center'}}>
                                <ProductImage image={this.state.selected.image} size={260} handle={_this.props}/>
                            </View>
                            <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.name}>{this.state.selected.name}</Text>
                                    <Text style={styles.own}>{this.state.selected.vendor_id == this.props.userInfo.uid ? ' (OWN)' : ''}</Text>
                                </View>
                                <Text style={styles.price}>{'$' + this.state.selected.price}</Text>
                            </View>
                            <View style={{paddingHorizontal: 10, marginBottom: 50}}>
                                <Text style={styles.description}>{this.state.selected.description}</Text>
                            </View>
                        </ScrollView>
                        :null
                    }                    
                </PopupDialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    productListItem: {
        marginHorizontal: 10,
        marginVertical: 5,
        height: 100,
        paddingLeft: 100,
        backgroundColor: colors.lightwhite,
        borderRadius: 8,
        padding: 5,
        borderWidth: 0,
        position: 'relative'
    },
    productImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        padding: 5
    },
    text: {
        color: colors.text,
        fontSize: 20,
        paddingLeft: 20
    },
    name: {
        color: colors.blue,
        fontSize: 20,
        fontFamily: fonts.syabil
    },
    own: {
        color: colors.darkGold,
        fontSize: 20,
        fontFamily: fonts.beilling
    },
    price: {
        color: colors.red,
        fontSize: 20,
        fontFamily: fonts.beilling
    },
    description: {
        color: colors.text,
        fontSize: 16,
        overflow: 'hidden',
        fontFamily: fonts.syabil
    },
    addButtonView: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 80,
        height: 80,
        backgroundColor: 'transparent'
    },
    addButtonImage: {
        width: 80,
        height: 80,
        resizeMode: 'stretch'
    },
    popupContainer: {
        
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        r_welcome: state.welcome,
        userInfo: state.userInfo
    }
}, mapDispatchToProps)(ProductList);
