import { HeaderTitle } from '@react-navigation/stack'
import Axios from 'axios'
import React from 'react'
import { Image, View, Alert, KeyboardAvoidingView, NativeModules } from 'react-native'
import { Text, Button, Input, Card } from 'react-native-elements'
import { ScrollView, TapGestureHandler, TouchableOpacity } from 'react-native-gesture-handler'
// import ImageCropPicker from 'react-native-image-crop-picker'
// import ImagePicker from 'react-native-image-crop-picker'
import HTML from 'react-native-render-html'
import { SERVER } from '../../../../config'

const ImagePicker = NativeModules.ImageCropPicker

export default class AddItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addTag: null,
            itemInfo: {
                title: null,
                body: null,
                price: null,
                quantity: null,
                tags: [],
                images: []
            }
        }

        this.handleEditorOpen = this.handleEditorOpen.bind(this)
        this.handleDeletePhoto = this.handleDeletePhoto.bind(this)
    }

    componentDidMount = () => {
        console.log(this.navigation)
    }

    handleChoosePhoto = () => {
        let temp = this.state.itemInfo.images
        if (temp.length >= 5) {
            alert("최대 5장까지만 업로드가 가능합니다")
        } else {
            ImagePicker.openPicker({ multiple: true })
                .then((images) => {
                    console.log(images)
                    if (images.length > (5 - temp)) {
                        alert(`선택한 사진이 5장을 초과합니다. 선택한 사진 중 ${5 - temp}장만 추가됩니다`)
                        let cutImages = images.slice(0, 5 - temp)
                        cutImages.map(image => temp.push(image))
                    } else {
                        images.map(image => temp.push(image))
                    }
                    this.setState({ itemInfo: Object.assign(this.state.itemInfo, { images: temp }) })
                })
        }
    }

    handleDeletePhoto = (index) => {
        let temp = this.state.itemInfo.images
        return new Promise((res, rej) =>
            res(Alert.alert("이미지 삭제", "선택한 이미지를 삭제하시겠습니까?", [{
                text: "OK", onPress: () => {
                    let deleted = temp.slice(0, index).concat(temp.slice(index + 1, temp.length))
                    this.setState({ itemInfo: Object.assign(this.state.itemInfo, { images: deleted }) })
                }
            }, { text: "Cancle", onPress: () => false }]))
        )
    }

    handleEditorOpen = () => {
        this.props.navigation.navigate('TextEditor', { handleValue: this.handleValue, itemInfo: this.state.itemInfo })
    }

    handleValue = (name, value) => {
        this.setState({
            itemInfo: Object.assign(this.state.itemInfo, { [name]: value })
        })
    }

    handleAddTag = () => {
        let temp = this.state.itemInfo.tags
        if (temp.length >= 3) {
            alert('태그는 3개까지 추가할 수 있습니다.')
            this.addTagInput.clear();
        } else {
            temp.push(this.state.addTag)
            this.setState({ itemInfo: Object.assign(this.state.itemInfo, { tags: temp }) })
            this.setState({ addTag: null })
            this.addTagInput.clear();
        }
    }

    handleDeleteTag = (index) => {
        let temp = this.state.itemInfo.tags
        return new Promise((res, rej) =>
            res(Alert.alert("태그 삭제", "선택한 태그를 삭제하시겠습니까?", [{
                text: "OK", onPress: () => {
                    let deleted = temp.slice(0, index).concat(temp.slice(index + 1, temp.length))
                    this.setState({ itemInfo: Object.assign(this.state.itemInfo, { tags: deleted }) })
                }
            }, { text: "Cancel", onPress: () => false }]))
        )
    }

    handleConfirm = () => {
        let { images } = this.state.itemInfo
        let imageFiles = new FormData();

        images.map(image => {
            imageFiles.append('products', {
                name: image.path.split("/")[image.path.split("/").length - 1],
                uri: image.path,
                type: image.mime
            })
        })

        console.log('Formdata', imageFiles);
        Axios.post(`${SERVER}/additem`, this.state.itemInfo)
            .then(data => {
                Axios({
                    method: "POST",
                    url: `${SERVER}/products`,
                    data: imageFiles,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then(uploadedImage => {
                        console.log('addedItem', data, 'uploadImage', uploadedImage)
                    })
            })

    }

    render() {
        let { itemInfo } = this.state
        return (
            <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                <KeyboardAvoidingView>
                    <Text>it's AddItem Page</Text>
                    <ScrollView horizontal style={{ Direction: "row" }}>
                        {itemInfo.images &&
                            itemInfo.images.map((photo, index) =>
                                <TouchableOpacity onPress={() => this.handleDeletePhoto(index)}>
                                    <Image key={index} source={{ uri: photo.path }} style={{ width: 100, height: 100, margin: 10 }} />
                                </TouchableOpacity>)}
                    </ScrollView>
                    <Button title="Select Photo" onPress={this.handleChoosePhoto} ></Button>
                    <Input placeholder='title' onChangeText={(e) => this.handleValue('title', e)} />
                    <Input placeholder='price' onChangeText={(e) => this.handleValue('price', e)} />
                    <Input placeholder='qunatity' onChangeText={(e) => this.handleValue('quantity', e)} />
                    <Input placeholder='add tags' onChangeText={(e) => this.setState({ addTag: e })} ref={ref => this.addTagInput = ref} />
                    <Button title="add tag" onPress={this.handleAddTag} />
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 50 }}>
                        {this.state.itemInfo.tags.length > 0 && this.state.itemInfo.tags.map((tag, index) =>
                            <TouchableOpacity onPress={() => this.handleDeleteTag(index)}>
                                <Card key={index} containerStyle={{ padding: 10, margin: 10 }}>
                                    <Text>{tag}</Text>
                                </Card>
                            </TouchableOpacity>)}
                    </View>
                    <ScrollView style={{ width: "100%", height: 200, backgroundColor: "white" }}>
                        <View>
                            {this.state.itemInfo.body ?
                                <HTML html={itemInfo.body} onPress={this.handleEditorOpen}></HTML>
                                : <TouchableOpacity onPress={this.handleEditorOpen}><Text style={{ textAlign: "center", marginTop: 80 }} >Click for add description</Text></TouchableOpacity>}
                        </View>
                    </ScrollView>
                    <Button title="Confirm" onPress={this.handleConfirm} />
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

