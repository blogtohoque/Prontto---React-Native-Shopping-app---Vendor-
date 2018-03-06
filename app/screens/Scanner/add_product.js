'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component, PropTypes} from 'react';
import {Text, Alert, View, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, Platform} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/actions'
import { Container, Content } from 'native-base';
import * as firebase from 'firebase'
import colors from '../../lib/colors'
import fonts from '../../lib/fonts'
import MyButton from '../../component/Button'
import Icon from 'react-native-vector-icons/Ionicons';
var ImagePicker = require('react-native-image-picker');
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export class AddProduct extends Component{

    constructor(props) {
        super(props);
        this.state = {
            ImageSelected: false,
            name: '',
            newPrice: '',
            description: ''
        };
    }

    static propTypes = {
        onBackToScan: PropTypes.func.isRequired,
        new: PropTypes.bool.isRequired,
        productID: PropTypes.string.isRequired
    }

    static defaultProps = {
        onBackToScan: () => undefined,
    }

    onSelectPhoto() {
        var options = {
            title: 'Select Product Image',
            maxWidth: 500,
            maxHeight: 500,
            quality: 1,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
        
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                if (Platform.OS === 'android') {
                    source = { uri: response.uri };
                    this.setState({imageUrl: response.uri});
                } else {
                    source = { uri: response.uri.replace('file://', '') };
                    this.setState({imageUrl: response.uri.replace('file://', '')});
                }
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };            
                this.setState({
                    image: source,
                    ImageSelected: true
                });
            }
        });
    }

    onAddProduct() {
        if(!this.checkValidation()) return
        this.setState({loading: true})
        //Upload Product Image
        let rnfbURI = RNFetchBlob.wrap(this.state.imageUrl);
        let filename = 'product_' + this.props.productID + '_' + this.props.userInfo.uid + '.jpg';

        let param = {
            name: this.state.name,
            price: this.state.newPrice,
            description: this.state.description,
            image: filename,
            product_id: this.props.productID,
            vendor_id: this.props.userInfo.uid
        }
        // create Blob from file path
        Blob.build(rnfbURI, { type : 'image/jpg;'})
        .then((blob) => {
          // upload image using Firebase SDK
            return  firebase.storage()
                    .ref('product')
                    .child(filename)
                    .put(blob, { contentType : 'image/jpg' })
                    .then((snapshot) => {       
                        this.setState({loading: false})
                        this.props.addProduct(param)
                        alert('Added successfully!')
                        this.props.onBackToScan()
                    });
        })
        .catch(error => {
            this.setState({loading: false});
            alert(error.toString())
        })
    }

    checkValidation() {
        if(this.state.name.replace(/ /g, '').length == 0){
            alert('Invalid product name!')
            return false
        }
        else if(Number(this.state.Price) <= 0){
            alert('Incorrect price!')
            return false
        }
        else if(this.state.description.length == 0){
            alert('You must type this description!')
            return false
        }
        else if(!this.state.ImageSelected){
            alert('You did not select product picture')
            return false
        }
        return true
    }

    render() {

        return (
            <Content contentContainerStyle={{backgroundColor: colors.lightwhite}}>
                <View style={styles.lineView}>
                    <Text style={styles.lineLeftText}>ProductID:</Text>
                    <Text style={styles.data}>{this.props.productID}</Text>
                </View>  
                <View style={styles.lineView}>
                    <Text style={styles.lineLeftText}>Name:</Text>
                    <TextInput
                        autoFocus={true}
                        style={styles.priceInput}
                        value={this.state.name}
                        onChangeText={(text) => this.setState({name: text})}
                        underlineColorAndroid='transparent'
                        maxLength={5}
                    />
                </View>
                <View style={styles.lineView}>
                    <Text style={styles.lineLeftText}>Price(SGD):</Text>
                    <TextInput
                        style={styles.priceInput}
                        value={this.state.newPrice}
                        onChangeText={(text) => this.setState({newPrice: text})}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        maxLength={5}
                    />
                </View>
                <View>          
                    <Text style={styles.dText}>Description:</Text>
                    <View>     
                    <TextInput
                        style={styles.descriptionInput}
                        value={this.state.description}
                        onChangeText={(text) => this.setState({description: text})}
                        underlineColorAndroid='transparent'
                        maxLength={1024}
                        multiline={true}
                    />
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.onSelectPhoto()} style={styles.photoView}>
                    {
                        this.state.ImageSelected?
                        <Image source={this.state.image} style={styles.image} />
                        :
                        <Icon name='ios-camera-outline' color={colors.text} size={150} />
                    }
                </TouchableOpacity>
                <View style={{marginTop: 50}}>
                    <MyButton text='Add' bottom={70} onPress={() => this.onAddProduct()} loading = {this.state.loading}/>
                </View>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    lineView: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    lineLeftText: {
        color: colors.darkGold,
        fontFamily: fonts.beilling,
        fontSize: 16,
        flex: 0.3,
        paddingLeft: 20
    },
    priceInput: {
        flex: 0.7,
        height: 50,
        borderBottomWidth: 1,
        borderColor: colors.text,
        color: colors.text,
        fontSize: 20,
        fontFamily: fonts.syabil,
        borderWidth: 1,
        marginRight: 20,
        paddingHorizontal: 10
    },
    data: {
        flex: 0.7,
        color: colors.text,
        fontSize: 20,
        fontFamily: fonts.syabil
    },
    dText: {
        color: colors.darkGold,
        fontFamily: fonts.beilling,
        fontSize: 16,
        paddingLeft: 20,
        marginTop: 20
    },
    descriptionInput: {
        margin: 20,
        borderColor: colors.text,
        borderWidth: 1,
        height: 200,
        color: colors.text,
        fontSize: 20,
        padding: 10,
        fontFamily: fonts.syabil
    },
    photoView: {
        marginHorizontal: (Width - 200) / 2,
        width: 200,
        height: 200,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.text,
        overflow: 'hidden'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover'
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
}, mapDispatchToProps)(AddProduct);
