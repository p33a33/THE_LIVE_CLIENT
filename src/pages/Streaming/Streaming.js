import Axios from 'axios'
import React from 'react'
import { View, NativeModules, Modal, StyleSheet } from 'react-native'
import { Text, Button, Input, Image } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import MyItemListEntry from '../../components/MyItemListEntry'
import SocketManager from '../../socketManager'
import { SERVER } from '../config'
import LinearGradient from 'react-native-linear-gradient'
import SelectProductForStreaming from '../../components/SelectProductForStreaming'

const ImagePicker = NativeModules.ImageCropPicker

export default class StreamingReady extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: null,
            body: null,
            status: 'PREPARE',
            product: null,
            broadcastId: null,
            thumbnail: null,
            myItems: null,
            isModalOpen: false
        }
        this.ha
    }

    componentDidMount = () => {
        Axios.get(`${SERVER}/myitem`).then(data => this.setState({ myItems: data.data }))
    }

    handleAddThumbnail = () => {
        ImagePicker.openPicker({ multiple: false })
            .then((image) => this.setState({ thumbnail: image }))
    }

    handleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    handleSelectProduct = (data) => {
        this.setState({ product: data })
    }

    handlePressOnAir = () => {
        let { title, body, thumbnail } = this.state

        let image = new FormData();
        SocketManager.instance.emitPrepareLiveStream({ title: title, body: body });

        image.append('thumbnail', {
            name: thumbnail.path.split("/")[thumbnail.path.split("/").length - 1],
            type: thumbnail.mime,
            uri: thumbnail.path
        })

        Axios.post(`${SERVER}/addThumbnail`, image, { headers: { "Content-Type": "multipart/form-data" } })
        // Axios.post(`${SERVER}/addLiveProduct`, { title: title, productid: this.state.product.id })

        this.props.navigation.navigate('OnAir', { handleVisible: this.props.route.params.handleVisible, userInfo: this.props.route.params.userInfo });
    }

    handleStatus = (name, val) => {
        this.setState({ [name]: val })
    }

    render() {
        return (
            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']}>
                <View style={{ paddingTop: 20, marginBottom: 10 }}><Text h4 style={{ textAlign: "left" }}>Streaming Information</Text></View>
                <View style={{ height: `${80}%`, alignItems: 'center', padding: 30 }}>
                    <ScrollView style={{ height: `${100}%`, width: `${80}%` }}>
                        <View style={{ alignItems: "center", marginBottom: 20 }}>
                            {this.state.thumbnail ? <Image source={{ uri: this.state.thumbnail.path }} style={{ width: 180, height: 270 }} />
                                : <View style={{ width: 180, height: 270, backgroundColor: "skyblue", justifyContent: "center" }}>
                                    <Text style={{ textAlign: "center" }}>Preview</Text>
                                </View>}
                        </View>
                        <Button title="Select Thumbnail" onPress={this.handleAddThumbnail} />
                        <Input placeholder="Title" onChangeText={e => this.handleStatus('title', e)} />
                        <TextInput style={{ textAlignVertical: "top", width: `${100}%` }} placeholder="Description" onChangeText={e => this.handleStatus('body', e)} />
                        {this.state.product && <View style={{
                            width: `${95}%`, alignSelf: "center", flexDirection: "row", marginBottom: `${3}%`, padding: 5, margin: 5, marginBottom: 10,
                            paddingLeft: 20, borderRadius: 20, backgroundColor: 'whitesmoke', elevation: 8,
                        }}>
                            <Image source={{ uri: `${SERVER + this.state.product.image}` }} style={{ width: 65, height: 65, marginRight: `${5}%`, borderRadius: 10 }} />
                            <View style={{ width: `${80}%` }}>
                                <View style={{ marginBottom: 5 }}>
                                    <Text style={styles.text}>{`${this.state.product.title.toUpperCase()}`}</Text>
                                </View>
                                <Text style={styles.buttonText}>￦ {this.state.product.price}</Text>
                                <Text style={styles.buttonText}>{`Available`.toUpperCase()} : {this.state.product.quantity}</Text>
                            </View>
                        </View>}
                        <Button title="Select Product" onPress={this.handleModal} />
                        <Modal visible={this.state.isModalOpen}>
                            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']}>
                                <View style={{ height: `${100}%` }}>
                                    <Button title="취소" onPress={this.handleModal} />
                                    {!this.state.myItems && <Text h4 style={{ textAlign: "center", marginTop: `${20}%` }}> 표시할 상품이 없습니다. </Text>}
                                    {this.state.myItems && <ScrollView contentContainerStyle={{ height: `${80}%`, width: `${100}%` }}>
                                        {this.state.myItems.map((item, index) =>
                                            <SelectProductForStreaming key={index} productInfo={item} handleSelectProduct={this.handleSelectProduct} handleModal={this.handleModal} />)}
                                    </ScrollView>}
                                </View>
                            </LinearGradient>
                        </Modal>
                    </ScrollView>
                </View>
                <Button title="On Air" onPress={this.handlePressOnAir} buttonStyle={{ marginTop: 20 }} />
            </LinearGradient>
        )
    }
}

const shadowOpt = {
    width: 60,
    height: 30,
    color: "#708090",
    border: 6,
    radius: 10,
    opacity: 0.3,
    x: 0,
    y: 1,
}

const styles = StyleSheet.create({

    body: {
        padding: 20,
        paddingBottom: -20,
        flex: 1,
        alignItems: 'center',
    },
    title: {
        padding: 5,
        color: "slateblue",
        letterSpacing: -0.5,
        fontSize: 17,
        fontFamily: "sans-serif",
    },
    InputContainer: {
        marginBottom: 5,
    },
    Input: {
        fontSize: 13,
        letterSpacing: -0.5,
        fontFamily: "sans-serif-light",
    },
    loginButton: {
        justifyContent: "center",
        backgroundColor: "white",
        width: 60,
        height: 30,
    },
    text: {
        fontSize: 15,
        color: "slateblue",
        fontFamily: "sans-serif",
    },
    buttonText: {
        fontSize: 13,
        color: "slategrey",
        fontFamily: "sans-serif-light",
    }
})