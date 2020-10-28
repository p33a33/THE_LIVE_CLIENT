import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'
import axios from 'axios'
import SignupForm from '../../components/SignupForm'
import { SERVER } from '../config'
import LinearGradient from 'react-native-linear-gradient'
import { BoxShadow } from 'react-native-shadow'
import Icon from 'react-native-vector-icons/FontAwesome';


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
                profileImage: null,
                phone: null,
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
                return axios.post(`${SERVER}/signup`, signupForm)
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
            <ScrollView >
                <LinearGradient useAngle={true} angle={45} colors={["lightgrey", "whitesmoke"]} style={styles.body}>
                    <Text h2 style={{
                        letterSpacing: -2.5,
                        margin: 15,
                        color: "black",
                    }} >THE LIVE
                    <Text style={{
                            letterSpacing: -2.5,
                            color: "blue",
                        }} >SIGN UP</Text></Text>
                    <SignupForm handleFormValues={this.handleFormValues} address={signupForm.address} photo={signupForm.photo} />
                    <BoxShadow setting={shadowOpt} >
                        <Icon.Button borderRadius={15} name="check" iconStyle={{ color: "blue" }} style={styles.loginButton} onPress={this.handleSignup} >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Icon.Button>
                    </BoxShadow>
                </LinearGradient>
            </ScrollView>
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
        color: "blue",
        letterSpacing: -1
    }
})