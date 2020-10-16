import axios from 'axios'
import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import UserInfoEditForm from '../../../../components/UserInfoEditForm'

export default class UserInfoEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfoEditForm: {
                oldPassword: null,
                newPassword: null,
                nickname: null,
                address: null,
                addressDetail: null,
                photo: null
            },
            passwordCheck: null,
        }
        this.handleFormValues = this.handleFormValues.bind(this)
    }

    handleFormValues = (name, val) => {
        let { userInfoEditForm } = this.state
        if (name === "passwordCheck") {
            this.setState({ passwordCheck: val })
        } else {
            this.setState({ userInfoEditForm: Object.assign(userInfoEditForm, { [name]: val }) })
        }
    }

    handleSubmit = () => {
        let { userInfoEditForm, passwordCheck } = this.state
        let { newPassword } = userInfoEditForm

        if (passwordCheck === newPassword) {
            // axios.post('http://172.30.1.44:5000/userInfoEdit')
            alert('수정이 완료되었습니다.')
        } else {
            alert('새 비밀번호를 다시 확인해주세요.')
        }
    }

    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <Text>it's UserInfoEdit Page</Text>
                <UserInfoEditForm handleFormValues={this.handleFormValues} newUserinfo={this.state.userInfoEditForm} />
                <Button title='변경하기' onPress={this.handleSubmit} />
            </ScrollView>
        )
    }
}

