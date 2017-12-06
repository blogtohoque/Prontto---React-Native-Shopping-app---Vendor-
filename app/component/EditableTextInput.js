'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component, PropTypes} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../lib/colors'
import fonts from '../lib/fonts'
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

export class EditableTextInput extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            editable: false,
            text: ''
        };
    };

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired
    }

    static defaultProps = {
        onChange: () => undefined,
        text: ''
    }

    onChange(text) {
        this.props.onChange(text)
    }

    onEdit() {
        this.setState({editable: true})
    }

    render(){        
        return(
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <TextInput
                        autoFocus={this.state.editable}
                        ref={(ref) => this.textInput = ref}
                        style={[styles.textInput, {color: this.state.editable ? colors.blue : colors.text}]}
                        editable={this.state.editable}
                        value={this.props.text}
                        onChangeText={(text) => this.onChange(text)}
                        underlineColorAndroid='transparent'
                        placeholder='None'
                        onSubmitEditing={() => this.setState({editable: false})}
                    />
                </View>
                <TouchableOpacity onPress={() => this.onEdit()}>
                    <Icon name='md-create' size={20} color={colors.darkGold} />
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {        
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        height: 50
    },
    textInput: {
        flex: 1,
        height: 50,
        backgroundColor: 'transparent',
        paddingBottom: 10,
        color: colors.text,
        fontSize: 16,
        fontFamily: fonts.syabil
    }
})

export default EditableTextInput;