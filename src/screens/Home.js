import React, {Component} from 'react';
import { createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions } from 'react-navigation';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Button,
    TextInput
} from 'react-native';
import Login from './Login';

const width = Dimensions.get('screen').width;

export default class Home extends Component {

    constructor(){
        super();
        this.state =  {
            email: "",
            password:""
        }
    }

    backLogin() {
         this.props.navigation.dispatch(StackActions.reset({
           index: 0,
           actions: [
             NavigationActions.navigate({ routeName: 'Login' })
           ],
         }))
    }

    render() {
        return (
        <View style={styles.container}>
        <Text>Home Page</Text>
        <View style={styles.button}>
          <Button color="green" title="Login"
              onPress={this.backLogin.bind(this)}/>
        </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    button: {
        marginTop: 15,
    },
});
