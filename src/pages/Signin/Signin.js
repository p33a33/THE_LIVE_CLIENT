import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import qs from 'qs';
import axios from 'axios'
import WebView from 'react-native-webview'
import { SERVER } from '../config'

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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text h1 > The Live </Text>
                <Input
                    placeholder="Email"
                    onChangeText={val => this.setState({ email: val })}
                    leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
                <Input
                    placeholder="Password"
                    onChangeText={val => this.setState({ password: val })}
                    leftIcon={<Icon name="key" type="font-awesome" size={30} />}
                    secureTextEntry={true} />
                <Button
                    title="Login"
                    onPress={this.handleSignin} />
                <Icon.Button name="google" backgroundColor="#D14E45" onPress={this.handleGoogleSignin}>
                    Login in with Google
                </Icon.Button>
                <Icon.Button name="facebook" backgroundColor="#3b5998">
                    Login in with Facebook
                </Icon.Button>
                <Icon.Button name="twitter" backgroundColor="#50ABF0">
                    Login in with twitter
                </Icon.Button>
                <Button
                    title="Sign up"
                    onPress={() => this.props.navigation.navigate('Signup')} />
            </View>
        )
    }
}



