import React from 'react'
import { View, Modal } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import Postcode from 'react-native-daum-postcode'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signupForm: {
                email: null,
                password: null,
                fullname: null,
                nickname: null,
                address: null,
                addressDetail: null,
            },
            passwordCheck: null,
            isModalOn: false
        }
    }

    handleSelectAddress = (data) => {
        console.log(data)
        this.setState({
            signupForm: Object.assign(this.state.signupForm, { address: data.address })
        })
        this.setState({
            isModalOn: false
        })
    }

    handleSignup = () => {
        let { passwordCheck, signupForm } = this.state
        let emptyInput = false
        for (let key in this.state.signupForm) {
            if (!signupForm[key]) {
                emptyInput = true
            }
        }
        if (emptyInput) {
            alert('Please fill in all the fields')
        } else {
            if (signupForm.password === passwordCheck) {
                console.log(signupForm)
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
        let { signupForm, isModalOn } = this.state

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text h1 > The Live </Text>
                <Input
                    placeholder="Email"
                    onChangeText={val => this.setState({ signupForm: Object.assign(signupForm, { email: val }) })}
                    leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
                <Input
                    placeholder="Password"
                    onChangeText={val => this.setState({ signupForm: Object.assign(signupForm, { password: val }) })}
                    leftIcon={<Icon name="key" type="font-awesome" size={30} />}
                    secureTextEntry={true} />
                <Input
                    placeholder="One more password"
                    onChangeText={val => this.setState({ passwordCheck: val })}
                    leftIcon={<Icon name="key" type="font-awesome" size={30} />}
                    secureTextEntry={true} />
                <Input
                    placeholder="Fullname"
                    onChangeText={val => this.setState({ signupForm: Object.assign(signupForm, { fullname: val }) })}
                    leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
                <Input
                    placeholder="Nickname"
                    onChangeText={val => this.setState({ signupForm: Object.assign(signupForm, { nickname: val }) })}
                    leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
                <Button title="modal opener" onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}></Button>
                <Text>선택한 주소 : {this.state.signupForm.address} </Text>
                <Input
                    placeholder="상세 주소"
                    onChangeText={val => this.setState({ signupForm: Object.assign(signupForm, { addressDetail: val }) })}
                    leftIcon={<Icon name="home" type="font-awesome" size={30} />} />

                <Modal visible={isModalOn}>
                    <Postcode style={{ flex: 1 }} jsOptions={{ animated: true }} onSelected={this.handleSelectAddress} ></Postcode>
                    <Button title="modal closer" onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}></Button>
                </Modal>
                <Button
                    title="Sign Up"
                    onPress={this.handleSignup} />
            </View>
        )
    }
}



