import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { Text, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Postcode from 'react-native-daum-postcode'
import ImagePicker from 'react-native-image-crop-picker'
import { BoxShadow } from 'react-native-shadow'


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
        return (<View style={styles.InputContainer}>
            <View style={{ marginBottom: 15 }}>
                <Input
                    style={styles.Input}
                    placeholder="Email"
                    onChangeText={val => handleFormValues('email', val)}
                    leftIcon={<Icon name="user-circle-o" type="font-awesome" size={21} style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />} />
                <Input
                    style={styles.Input}
                    placeholder=" ••••"
                    onChangeText={val => handleFormValues('password', val)}
                    leftIcon={<Icon name="unlock-alt" type="font-awesome" size={22} style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />}
                    secureTextEntry={true}
                />
                <Input
                    style={styles.Input}
                    placeholder=" ••••"
                    onChangeText={val => handleFormValues('passwordCheck', val)}
                    leftIcon={<Icon name="unlock-alt" type="font-awesome" size={22} style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />}
                    secureTextEntry={true} />
            </View>
            <View >
                <Input
                    style={styles.Input}
                    placeholder="Phone"
                    onChangeText={val => handleFormValues('phone', val)}
                    leftIcon={<Icon name="phone" type="font-awesome" size={22} style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />} />
                {/* 전화번호 형식 확인 필요 */}
                <Input
                    style={styles.Input}
                    placeholder="Fullname"
                    onChangeText={val => handleFormValues('fullname', val)}
                    leftIcon={<Icon name="user" type="font-awesome" size={22} style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />} />
                <Input
                    style={styles.Input}
                    placeholder="Nickname"
                    onChangeText={val => handleFormValues('nickname', val)}
                    leftIcon={<Icon name="user" type="font-awesome" size={22} style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />} />
                <View style={{ alignItems: "center" }}>
                    <BoxShadow setting={shadowOpt} >
                        <Icon.Button name="map"
                            iconStyle={{ color: "slategrey" }}
                            borderRadius={15}
                            style={styles.loginButton}
                            onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}>
                            <Text style={styles.buttonText}>Search Address</Text>
                        </Icon.Button>
                    </BoxShadow>
                </View>
            </View>
            {this.props.address ?
                <>
                    <View style={{
                        padding: 15,
                        flex: 1,
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", letterSpacing: -0.5, color: "slateblue", fontFamily: "sans-serif" }} >선택한 주소 </Text>
                        <Text style={{ fontSize: 14, letterSpacing: -0.5 }}>{address}</Text>
                    </View>
                    <Input
                        style={styles.Input}
                        placeholder="상세 주소"
                        onChangeText={val => handleFormValues('addressDetail', val)}
                        leftIcon={<Icon name="home" type="font-awesome" size={22} style={{ paddingLeft: 8, paddingRight: 5, color: "slateblue", fontFamily: "sans-serif-light" }} />
                        } />
                </> : <View style={{
                    padding: 15,
                    flex: 1,
                }}></View>}

            <Modal visible={isModalOn}>
                <Postcode style={{ flex: 1 }} jsOptions={{ animated: true }} onSelected={this.handleSelectAddress} ></Postcode>
                <View style={{ justifyContent: "center" }}>
                    <BoxShadow setting={shadowOpt} >
                        <Icon.Button name="close"
                            iconStyle={{ color: "grey" }}
                            style={styles.loginButton}
                            onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}>
                            <Text style={styles.buttonText}>Close</Text>
                        </Icon.Button>
                    </BoxShadow>
                </View>
            </Modal>
            <View style={{ alignItems: "center" }}>
                {photo && <Image source={{ uri: photo.path }} style={{ width: 150, height: 150 }} />}
                {!photo && <Text style={{ margin: 15, fontSize: 16, letterSpacing: -0.5, color: "slateblue", fontFamily: "sans-serif" }}>사진을 선택해주세요</Text>}
                <BoxShadow setting={shadowOpt} >
                    <Icon.Button name="camera" onPress={this.handleChoosePhoto}
                        borderRadius={15} iconStyle={{ color: "grey" }}
                        style={styles.loginButton} >
                        <Text style={styles.buttonText}>Choose Photo</Text>
                    </Icon.Button>
                </BoxShadow>
            </View>
        </View >
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
        alignContent: "center"
    }
}
const styles = StyleSheet.create({
    body: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    InputContainer: {
        marginTop: 35,
        marginBottom: 20,
        width: 300,
    },
    Input: {
        fontSize: 15,
        letterSpacing: -0.5,
        fontFamily: "sans-serif-light",
    },
    loginButton: {
        justifyContent: "center",
        backgroundColor: "white",
    },
    buttonText: {
        color: "slategrey",
        letterSpacing: -0.5,
        fontFamily: "sans-serif",
    }
})