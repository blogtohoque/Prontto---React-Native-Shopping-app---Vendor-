'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Text, Alert, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/actions'
import { Container, Content } from 'native-base';
import Camera from 'react-native-camera';
import NavBar from '../../component/NavBar'
import colors from '../../lib/colors'
import fonts from '../../lib/fonts'
import MyButton from '../../component/Button'
import AddProduct from './add_product'
import ProductList from './list_product'
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height
import { WaveIndicator } from 'react-native-indicators';

export class Scanner extends Component{

    constructor(props) {
        super(props);
        this.state = {
            step: 'scanning',
            data: '789456123',
            productData: {}
        };
    }

    onBarCodeRead(e){
        this.setState({type: e.type, data: e.data, step: 'processing'})
        this.props.searchProduct(e.data, (res) => {
            const count = Object.keys(res).length;
            if(count == 0){
                this.setState({step: 'scanned_new'})
            }
            else{
                this.setState({productData: res, step: 'scanned_exist'})
            }
        })
    }

    onAddProduct(){

    }

    render() {
        let title = 'Scanner'
        let rightIconName = 'ios-qr-scanner-outline'
        if(this.state.step == 'scanned_new') title = 'Add Item'
        else if(this.state.step == 'scanned_exist') title = 'Item List'
        else if(this.state.step == 'add_vendor') title = 'Add Vendor'
        else rightIconName = ''
        return (
            <Container>
                <NavBar 
                    title={title} 
                    onMenuButtonPress={() => this.props.onMenuClick()}
                    rightIconName={rightIconName}
                    onRightClick={() => this.setState({step: 'scanning'})}
                />
                <View style={{flex: 1, backgroundColor: colors.lightwhite}}>                
                {
                    this.state.step == 'scanned_new'?
                    <AddProduct new={true} productID={this.state.data} onBackToScan={() => this.setState({step: 'scanning'})}/>
                    :this.state.step == 'add_vendor'?
                    <AddProduct new={false} productID={this.state.data} onBackToScan={() => this.setState({step: 'scanning'})}/>
                    :this.state.step == 'scanned_exist'?
                    <ProductList productData={this.state.productData} onAddVendor={() => this.setState({step: 'add_vendor'})}/>
                    :this.state.step == 'processing'?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <WaveIndicator color={colors.blue} waveMode='outline' size = {50}/>
                    </View>
                    :<View style={{flex: 1, position: 'relative'}}>
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
            </Container>
        )
    }

    componentDidMount() {
        // this.setState({
        //     productData: {
        //         '0oIejfVaTseAoXNNq2C3yMxapJh1' :{
        //             description: 'You can use the value event to read a static snapshot of the contents at a given path, as they existed at the time of the event. This method is triggered once when the listener is attached and again every time the data, including children, changes. The event callback is passed a snapshot containing all data at that location, including child data. If there is no data, the snapshot returned is',
        //             image: "product_6901285991219.jpg",
        //             name: 'water',
        //             price: 5,
        //             product_id: "69012855991219",
        //             vendor_id: '0oIejfVaTseAoXNNq2C3yMxapJh1'
        //         }
        //     }, 
        //     step: 'scanned_exist'
        // })
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
    cover: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
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
