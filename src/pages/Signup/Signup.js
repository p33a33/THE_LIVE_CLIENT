import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signupForm: {
                email: null,
                password: null,
                fullname: null,
                nickname: null,
                address: null
            },
            passwordCheck: null,
        }
    }

    handleSignup = () => {
        let { signupForm, passwordCheck } = this.state
        let emptyInput = false

        for (let key in signupForm) {
            if (!signupForm[key]) {
                emptyInput = true
            }
        }

        if (emptyInput) {
            alert('Please fill in all the fields')
        } else {
            if (signupForm.password === passwordCheck) {
                return axios.post(`http://172.30.1.44:5000/signup`, signupForm)
                    .then(res => {
                        if (res.status === 201) {
                            this.props.navigation.navigate('Signin');
                        } else {
                            alert('An error occurs, please try again')
                        }
                    })
            } else {
                alert('Please check your password')
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text h1 > The Live </Text>
                <Input
                    placeholder="Email"
                    onChangeText={val => this.setState({ signupForm: { email: val } })}
                    leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
                <Input
                    placeholder="Password"
                    onChangeText={val => this.setState({ signupForm: { password: val } })}
                    leftIcon={<Icon name="key" type="font-awesome" size={30} />}
                    secureTextEntry={true} />
                <Input
                    placeholder="One more password"
                    onChangeText={val => this.setState({ passwordCheck: val })}
                    leftIcon={<Icon name="key" type="font-awesome" size={30} />}
                    secureTextEntry={true} />
                <Input
                    placeholder="Fullname"
                    onChangeText={val => this.setState({ signupForm: { fullname: val } })}
                    leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
                <Input
                    placeholder="Nickname"
                    onChangeText={val => this.setState({ signupForm: { nickname: val } })}
                    leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
                <Button
                    title="Sign Up"
                    onPress={this.handleSignup} />
            </View>
        )
    }
}



