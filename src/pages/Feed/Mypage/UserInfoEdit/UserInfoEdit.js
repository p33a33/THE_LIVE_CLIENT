import axios from 'axios'
import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import UserInfoEditForm from '../../../../components/UserInfoEditForm'
import { SERVER } from '../../../config'

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
            isSeller: false
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
            // axios.post(`${SERVER}/signedit`, userInfoEditForm)
            alert('수정이 완료되었습니다.')
        } else {
            alert('새 비밀번호를 다시 확인해주세요.')
        }
    }

    componentDidMount = () => {
        axios.get(`${SERVER}/userInfo`)
            .then(data => {
                let { is_seller } = data.data

                if (is_seller) {
                    this.setState({ isSeller: true })
                }
            })
    }

    HandleRegistSeller = () => {
        axios.post(`${SERVER}/registseller`)
            .then(data => {
                if (data.status === 200) {
                    alert('성공적으로 판매자 등록을 마쳤습니다.')
                    axios.get(`${SERVER}/userInfo`)
                        .then(data => {
                            this.setState({ isSeller: data.data.is_seller })
                            this.props.handleSellerState(data.data.is_seller)
                        })
                } else {
                    alert('등록 중 에러가 발생했습니다.')
                }
            })
    }


    render() {
        let { isSeller } = this.state

        return (
            <ScrollView style={{ padding: 20 }}>
                <Text>it's UserInfoEdit Page</Text>
                <UserInfoEditForm handleFormValues={this.handleFormValues} newUserinfo={this.state.userInfoEditForm} />
                <Button title='변경하기' onPress={this.handleSubmit} />

                <Button title={isSeller ? "판매자 그만두기" : "판매자로 등록하기"} onPress={this.HandleRegistSeller} />
            </ScrollView>
        )
    }
}

