import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import qs from 'qs';
import axios from 'axios'
import WebView from 'react-native-webview'
import { SERVER } from '../config'
import { BoxShadow } from 'react-native-shadow'
import LinearGradient from 'react-native-linear-gradient'

export default class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            googleAuth: null
        }
        this.handleSignin = this.handleSignin.bind(this)
    }

    handleSignin = () => {
        let { email, password } = this.state
        let data = qs.stringify({ email, password }) // 데이터를 Form Data 형식으로 변환해줍니다.
        axios.post(`${SERVER}/signin`, data)
            .then(res => {
                if (res.status === 200) {
                    this.props.navigation.navigate('FeedIndex')
                }
            })
    }

    handleGoogleSignin = () => {
        axios.get(`${SERVER}/auth/google`)
            .then(res => this.setState({ googleAuth: res.request.responseURL }))
            .then(() => this.props.navigation.navigate('Oauth', { url: this.state.googleAuth }))
    }

    render() {
        return (
            <LinearGradient useAngle={true} angle={45} colors={["lightgrey", "whitesmoke"]} style={styles.body}>
                <Text h2 style={{
                    letterSpacing: -2.5,
                    margin: 15,
                    color: "black",
                }} >THE LIVE</Text>
                <View style={styles.InputContainer}>
                    <Input
                        style={styles.Input}
                        placeholder="Email"
                        placeholderTextColor="grey"
                        onChangeText={val => this.setState({ email: val })}
                        leftIcon={<Icon name="user-circle-o" style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} type="font-awesome" size={21.5} />} />
                    <Input
                        style={styles.Input}
                        placeholderTextColor="grey"
                        placeholder="Password"
                        onChangeText={val => this.setState({ password: val })}
                        leftIcon={<Icon name="unlock-alt" style={{ paddingLeft: 9, paddingRight: 8, color: "slategrey" }} type="font-awesome" size={23} />}
                        secureTextEntry={true} />
                </View>
                <BoxShadow setting={shadowOpt} >
                    <Icon.Button name="sign-in" borderRadius={15} iconStyle={{ color: "grey" }} onPress={this.handleSignin}
                        style={styles.loginButton} >
                        <Text style={styles.buttonText}>Sign in</Text>
                    </Icon.Button>
                </BoxShadow>
                <BoxShadow setting={shadowOpt}  >
                    <Icon.Button name="google" borderRadius={15} iconStyle={{ color: "#D14E45" }} style={styles.loginButton} onPress={this.handleGoogleSignin}>
                        <Text style={styles.buttonText}>Sign in with Google</Text>
                    </Icon.Button>
                </BoxShadow>
                <BoxShadow setting={shadowOpt} >
                    <Icon.Button name="facebook" borderRadius={15} iconStyle={{ color: "#3b5998" }} style={styles.loginButton} >
                        <Text style={styles.buttonText}>Sign in with Facebook</Text>
                    </Icon.Button>
                </BoxShadow>
                <BoxShadow setting={shadowOpt} >
                    <Icon.Button name="user-plus" borderRadius={15} iconStyle={{ color: "grey" }} style={styles.loginButton} onPress={() => this.props.navigation.navigate('Signup')} >
                        <Text style={styles.buttonText}>Sign up</Text>
                    </Icon.Button>
                </BoxShadow>
            </LinearGradient>
        )
    }
}

const shadowOpt = {
    width: 185,
    height: 25,
    color: "#808080",
    border: 5,
    radius: 10,
    opacity: 0.3,
    x: 0,
    y: 13,
    style: {
        marginVertical: 11,
    }
}

const styles = StyleSheet.create({
    body: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    InputContainer: {
        marginTop: 35,
        marginBottom: 30,
        width: 300,
    },
    Input: {
        fontSize: 15,
        letterSpacing: -0.5
    },
    loginButton: {
        justifyContent: "center",
        backgroundColor: "white",
    },
    buttonText: {
        color: "slategrey",
        letterSpacing: -1,
    },

})