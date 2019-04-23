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
    TextInput,
    AsyncStorage
} from 'react-native';
import Home from './Home';
const width = Dimensions.get('screen').width;

export default class Login extends Component {

    constructor(){
        super();
        this.state =  {
            email: '',
            password:'',
            message:''
        }
    }

   login() {

     const requestInfo = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
              query: "mutation($data: SignInUser!) {signIn(data: $data)}",
              variables: {
                  data: {
                      email: this.state.email,
                      password: this.state.password
                    }
                  }
              })
            };
     //clean message before call login
     this.setState({message: ''})
     fetch('http://localhost:3000/graphql/v1/%20-H%20\'Content-Type:%20application/json\'%20-d%20\'%7B?', requestInfo)
        .then(response => {
          if(response.ok) {
            return response.json();
          } else {
            throw new Error(response.json());
          }
        }).then(response => {
          if(response.data.signIn){
            AsyncStorage.setItem('token',response.data.signIn);
            AsyncStorage.setItem('userEmail',this.state.email);
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ],
            }))
          } else {
            this.setState({message: response.errors[0].message})
          }
        }).catch(e => {
          this.setState({message: e.message})
        });
    }

    render() {
        return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Família SDV
            </Text>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={text => this.setState({email: text})}/>
                <TextInput style={styles.input}  placeholder="Senha"
                    secureTextEntry={true} autoCapitalize="none"
                    onChangeText={text => this.setState({password: text})}/>
                <View style={styles.button}>
                  <Button color="green" title="Login"
                      onPress={this.login.bind(this)}/>
                </View>
            </View>
            <Text style={styles.message}>
                {this.state.message}
            </Text>
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
    form: {
        width: width * 0.7
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    title: {
        color: 'green',
        fontSize: 26,
        marginBottom: 15,
    },
    button: {
        marginTop: 15,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    message:{
      marginTop: 15,
      color: '#e74c3c',
    }
});
