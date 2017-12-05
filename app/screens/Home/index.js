'use strict';

/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Platform} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../redux/actions'
import SideMenu from 'react-native-side-menu'
import SideView from '../../component/SideView'
import colors from '../../lib/colors'
import { NavigationActions } from 'react-navigation'
import StoreSetup from '../StoreSetup'
import InvoiceSetup from '../InvoiceSetup'
import Inventory from '../Inventory'
import Promotion from '../Promotion'
import People from '../People'
import FAQ from '../FAQ'
import Scanner from '../Scanner'
import Profile from '../Profile'

export class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            sideBarIndex: 1
        };
    };

    componentDidMount() {
        this.props.welcome()
    }

    onSelectSideBar(index) {
        this.setState({sideBarIndex: index, isOpen: false})
        switch(index){
            case 1://on Select "Browse Pranks"
                break
            case 2://on Select "History"
                break
            case 3://on Select "Get Credits"
                break
            case 4://on Select "Help"
                break
            case 9://on Select "Help"
                // const resetAction = NavigationActions.reset({
                //     index: 0,
                //     actions: [
                //         NavigationActions.navigate({ routeName: 'auth', params: {}})
                //     ]
                // })
                // this.props.navigation.dispatch(resetAction)
                this.onPressAccout()
                break
            default: 
                break            
        }
    }

    onScanned(data) {
        this.setState({sideBarIndex: 2})
    }

    render(){
        const menu = <SideView onSelectItem={(index) => this.onSelectSideBar(index)}/>
        return(
            <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={isOpen => this.setState({isOpen})} style={styles.container}>
                {
                    this.state.sideBarIndex == 1?
                    <StoreSetup 
                        onMenuClick={() => this.setState({isOpen: !this.state.isOpen})} 
                        navigation={this.props.navigation} 
                    />
                    :this.state.sideBarIndex == 2?
                    <InvoiceSetup 
                        onMenuClick={() => this.setState({isOpen: !this.state.isOpen})} 
                        navigation={this.props.navigation} 
                    />
                    :this.state.sideBarIndex == 3?
                    <Inventory 
                        onMenuClick={() => this.setState({isOpen: !this.state.isOpen})} 
                        navigation={this.props.navigation} 
                    />
                    :this.state.sideBarIndex == 4?
                    <People 
                        onMenuClick={() => this.setState({isOpen: !this.state.isOpen})} 
                        navigation={this.props.navigation} 
                    />
                    :this.state.sideBarIndex == 5?
                    <Promotion 
                        onMenuClick={() => this.setState({isOpen: !this.state.isOpen})} 
                        navigation={this.props.navigation} 
                    />
                    :this.state.sideBarIndex == 6?
                    <Scanner 
                        onMenuClick={() => this.setState({isOpen: !this.state.isOpen})} 
                        navigation={this.props.navigation} 
                        onScanned={(data) => this.onScanned(data)}
                    />
                    :this.state.sideBarIndex == 7?
                    <FAQ 
                        onMenuClick={() => this.setState({isOpen: !this.state.isOpen})} 
                        navigation={this.props.navigation} 
                    />
                    :this.state.sideBarIndex == 8?
                    <Profile 
                        onMenuClick={() => this.setState({isOpen: !this.state.isOpen})} 
                        navigation={this.props.navigation} />
                    :null
                }
            </SideMenu>        
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
        backgroundColor: colors.lightwhite
    },
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        welcome: state.welcome
    }
}, mapDispatchToProps)(Home);
