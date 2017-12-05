'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/actions'
import { Container, Content} from 'native-base'
import NavBar from '../../component/NavBar'
import colors from '../../lib/colors'

export class Promotion extends Component{

    constructor(props){
        super(props);
        this.state = {

        };
    };

    render(){
        return(
            <Container>
                <NavBar title='Promotion' onMenuButtonPress={() => this.props.onMenuClick()}/>
                <View style={styles.container}>
                    <Content>
                        <Text>This is Promotion Page!</Text>
                    </Content>
                </View>
            </Container>        
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightwhite
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        welcome: state.welcome
    }
}, mapDispatchToProps)(Promotion);
