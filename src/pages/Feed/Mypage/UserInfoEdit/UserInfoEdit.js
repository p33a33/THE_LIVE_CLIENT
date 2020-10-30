import axios from 'axios'
import React from 'react'
import { View, Modal, TouchableWithoutFeedbackBase, Alert } from 'react-native'
import { Text, Button, Input, ButtonGroup } from 'react-native-elements'
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
            isModalOpen: false,
            isSeller: false,
            sellerBank: null,
            sellerAccount: null,

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

    handleFormSeller = (name, val) => {
        this.setState({ [name]: val })
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

    handlePressButton = (index) => {
        let { sellerAccount, sellerBank } = this.state

        switch (index) {
            case 0: {
                if (sellerBank && sellerAccount) {
                    console.log('send this data', { sellerBank, sellerAccount })
                    axios.post(`${SERVER}/addseller`, { sellerBank, sellerAccount })
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
                    this.setState({ isModalOpen: false })
                    break;
                } else {
                    alert("please fill all inputs")
                    break;
                }
            }
            case 1: {
                this.setState({ sellerAccount: null, sellerBank: null, isModalOpen: false })
                break;
            }
        }
    }

    HandleRegistSeller = () => {
        if (this.state.isSeller) {
            Alert.alert(
                'Registration Cancellation',
                '판매자 권한을 해제하면 판매자로서의 정보가 모두 지워집니다. 그래도 진행하시겠습니까?',
                [{
                    text: "OK", onPress: () => {
                        axios.post(`${SERVER}/addseller`, { sellerBank: null, sellerAccount: null })
                            .then(data => {
                                if (data.status < 300) {
                                    axios.get(`${SERVER}/userInfo`)
                                        .then(data => {
                                            this.setState({ isSeller: data.data.is_seller })
                                            this.props.handleSellerState(data.data.is_seller)
                                        })
                                    alert("판매자 권한이 해제되었습니다.")
                                }
                                else {
                                    alert("에러가 발생했습니다. 다시 시도해주세요")
                                }
                            })
                    }
                }, { text: "Cancel", onPress: () => this.setState({ isModalOpen: false }) }]
            )
        } else {
            this.setState({ isModalOpen: true })
        }
    }


    render() {
        let { isSeller } = this.state

        return (
            <ScrollView style={{ padding: 20 }}>
                <Text>it's UserInfoEdit Page</Text>
                <UserInfoEditForm handleFormValues={this.handleFormValues} newUserinfo={this.state.userInfoEditForm} />
                <Button title='변경하기' onPress={this.handleSubmit} />

                <Button title={isSeller ? "판매자 그만두기" : "판매자로 등록하기"} onPress={this.HandleRegistSeller} />

                {this.state.isModalOpen && <Modal transparent={true} style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: `${70}%`, height: `${50}%`, backgroundColor: `rgba(1, 1, 1, 1)`, borderRadius: 15, padding: 20 }}>
                            <Text h4 style={{ marginBottom: 20 }}> Regist Seller </Text>
                            <Input placeholder="Bank" onChangeText={e => this.handleFormSeller('sellerBank', e)} />
                            <Input placeholder="Account" onChangeText={e => this.handleFormSeller('sellerAccount', e)} />
                            <ButtonGroup onPress={this.handlePressButton} buttons={[`Done`, `Cancel`]} />
                        </View>
                    </View>
                </Modal>}

            </ScrollView>
        )
    }
}

