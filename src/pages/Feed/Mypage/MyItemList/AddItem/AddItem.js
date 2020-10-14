import React from 'react'
import { Image, View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker'

export default class AddItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            images: []
        }
    }

    handleChoosePhoto = () => {
        ImagePicker.openPicker({ multiple: true })
            .then((images) => this.setState({ images: images }))
    }

    render() {
        let { images } = this.state
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's AddItem Page</Text>
                <Button title="상품 사진 선택" onPress={this.handleChoosePhoto}></Button>
                {images &&
                    images.map(photo =>
                        <Image source={{ uri: photo.path }} style={{ width: 100, height: 100 }} />
                    )}
            </View>
        )
    }
}

