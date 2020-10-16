import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-elements'
import axios from 'axios'
import SignupForm from '../../components/SignupForm'

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
                photo: null,
            },
            passwordCheck: null,
            isModalOn: false
        }
        this.handleFormValues = this.handleFormValues.bind(this)
    }

    handleFormValues = (name, val) => {
        let { signupForm } = this.state
        if (name === "passwordCheck") {
            this.setState({ passwordCheck: val })
        } else {
            this.setState({ signupForm: Object.assign(signupForm, { [name]: val }) })
        }
    }

    handleSignup = () => {
        let { passwordCheck, signupForm } = this.state
        let emptyInput = false

        console.log('signupForm', signupForm)

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
                return axios.post(`http://172.30.1.22:5000/signup`, signupForm)
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
        let { signupForm } = this.state

        return (
            <ScrollView stickyHeaderIndices>
                <View style={{ padding: "10%" }}>
                    <Text h1 style={{ textAlign: 'center' }}> The Live </Text>
                    <SignupForm handleFormValues={this.handleFormValues} address={signupForm.address} photo={signupForm.photo} />
                </View>
                <Button style={{ position: "sticky" }} title="Sign Up" onPress={this.handleSignup} />
            </ScrollView>
        )
    }
}



