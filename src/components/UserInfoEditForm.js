import React from 'react'
import { View, Modal } from 'react-native'
import { Text, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Postcode from 'react-native-daum-postcode'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'

export default class UserInfoEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOn: false,
            userInfo: null,
        }
    }

    componentDidMount() {
        axios.get("http://172.30.1.22:5000/userinfo").then(res => this.setState({ userInfo: res.data }))
    }

    handleSelectAddress = (data) => {
        this.props.handleFormValues('address', data.address)
        this.setState({
            isModalOn: false
        })
    }

    handleChoosePhoto = () => {
        ImagePicker.openPicker({ multiple: false })
            .then((image) => { this.props.handleFormValues('photo', image) })
    }

    render() {
        let { handleFormValues, newUserinfo } = this.props
        let { isModalOn, userInfo } = this.state
        console.log(this.props)
        return (<View>
            <Input
                placeholder="Current Password"
                onChangeText={val => handleFormValues('oldPassword', val)}
                leftIcon={<Icon name="key" type="font-awesome" size={22} />}
                secureTextEntry={true}
            />
            <Input
                placeholder="New Password"
                onChangeText={val => handleFormValues('newPassword', val)}
                leftIcon={<Icon name="key" type="font-awesome" size={22} />}
                secureTextEntry={true} />
            <Input
                placeholder="One more new password"
                onChangeText={val => handleFormValues('passwordCheck', val)}
                leftIcon={<Icon name="key" type="font-awesome" size={22} />}
                secureTextEntry={true} />

            <Text> 현재 닉네임 : {userInfo ? userInfo.nickname : ""}</Text>
            <Input
                placeholder="New nickname"
                onChangeText={val => handleFormValues('nickname', val)}
                leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
            <Button title="Search Address" onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}></Button>
            <Text style={{ fontSize: 20 }} >선택한 주소 </Text>
            <Text style={{ fontSize: 16 }}>{newUserinfo.address}</Text>
            <Input
                placeholder="상세 주소"
                onChangeText={val => handleFormValues('addressDetail', val)}
                leftIcon={<Icon name="home" type="font-awesome" size={30} />} />
            <Modal visible={isModalOn}>
                <Postcode style={{ flex: 1 }} jsOptions={{ animated: true }} onSelected={this.handleSelectAddress} ></Postcode>
                <Button title="modal closer" onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}></Button>
            </Modal>
            <View style={{ alignItems: 'center' }}>
                <Text>새로 사용할 프로필 사진</Text>
                {newUserinfo.photo && <Image source={{ uri: newUserinfo.photo.path }} style={{ width: 150, height: 150 }} />}

            </View>
            <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        </View>
        )
    }
}
