import React from 'react'
import { View, KeyboardAvoidingView, Platform } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import ImagePicker from 'react-native-image-crop-picker'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: null,
        }
    }

    handleChoosePhoto = () => {
        ImagePicker.openPicker({ multiple: true })
            .then((images) => {
                images.map(image => this.editor.insertImage(image.path))
            })
    }

    componentDidMount = () => {
        this.setState({ body: this.props.route.params.itemInfo.body })
    }

    render() {
        let { body } = this.state
        let { handleValue } = this.props.route.params
        return (
            <View style={{ flex: 1 }}>
                <RichEditor
                    style={{ flex: 1 }}
                    ref={(r) => this.editor = r}
                    placeholder="간단한 상품 설명을 적어주세요"
                    initialContentHTML={body}
                    onChange={e => this.setState({ body: e })}
                />
                <KeyboardAccessoryView alwaysVisible={true} androidAdjustResize={true}>
                    <View>
                        <RichToolbar
                            getEditor={() => this.editor}
                            onPressAddImage={this.handleChoosePhoto} />
                        <Button
                            title="Confirm"
                            onPress={() => {
                                handleValue("body", '<div>' + body + '</div>');
                                this.props.navigation.goBack();
                            }
                            } />
                    </View>
                </KeyboardAccessoryView>
            </View>
        )
    }
}

