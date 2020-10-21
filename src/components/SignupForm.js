import React from 'react'
import { View, Modal } from 'react-native'
import { Text, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Postcode from 'react-native-daum-postcode'
import ImagePicker from 'react-native-image-crop-picker'

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOn: false
        }
    }

    handleSelectAddress = (data) => {
        this.props.handleFormValues('address', data.address)
        this.setState({
            isModalOn: false
        })
    }

    handleChoosePhoto = () => {
        ImagePicker.openPicker({ multiple: false })
            .then((image) => { this.props.handleFormValues("profileImage", image) })
    }

    render() {
        let { handleFormValues, address, photo } = this.props
        let { isModalOn } = this.state
        return (<View>
            <Input
                placeholder="Email"
                onChangeText={val => handleFormValues('email', val)}
                leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
            <Input
                placeholder="Password"
                onChangeText={val => handleFormValues('password', val)}
                leftIcon={<Icon name="key" type="font-awesome" size={22} />}
                secureTextEntry={true} />
            <Input
                placeholder="One more password"
                onChangeText={val => handleFormValues('passwordCheck', val)}
                leftIcon={<Icon name="key" type="font-awesome" size={22} />}
                secureTextEntry={true} />
            <Input
                placeholder="Phone"
                onChangeText={val => handleFormValues('phone', val)}
                leftIcon={<Icon name="phone" type="font-awesome" size={30} />} />
            {/* 전화번호 형식 확인 필요 */}
            <Input
                placeholder="Fullname"
                onChangeText={val => handleFormValues('fullname', val)}
                leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
            <Input
                placeholder="Nickname"
                onChangeText={val => handleFormValues('nickname', val)}
                leftIcon={<Icon name="user" type="font-awesome" size={30} />} />
            <Button title="Search Address" onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}></Button>
            <Text style={{ fontSize: 20 }} >선택한 주소 </Text>
            <Text style={{ fontSize: 16 }}>{address}</Text>
            <Input
                placeholder="상세 주소"
                onChangeText={val => handleFormValues('addressDetail', val)}
                leftIcon={<Icon name="home" type="font-awesome" size={30} />} />
            <Modal visible={isModalOn}>
                <Postcode style={{ flex: 1 }} jsOptions={{ animated: true }} onSelected={this.handleSelectAddress} ></Postcode>
                <Button title="modal closer" onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}></Button>
            </Modal>
            <View style={{ alignItems: 'center' }}>
                {photo && <Image source={{ uri: photo.path }} style={{ width: 150, height: 150 }} />}
                {!photo && <Text>사진을 선택해주세요</Text>}
            </View>
            <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        </View>
        )
    }
}
