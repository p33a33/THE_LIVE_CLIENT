import React, { Children } from 'react'
import { View, TextInput, Keyboard } from 'react-native'
import { Input, Text, Button, Image, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import ChatOutput from './ChatOutput'

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    handlePressSend = () => {
        this.props.handleSendChat()
        // Keyboard.dismiss();
        this.chatInput.clear();
    }

    render() {
        let { handleInputValue, handlePressHeart, messages } = this.props
        return (
            <KeyboardAccessoryView
                alwaysVisible={true}
                androidAdjustResize={true}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', height: 0, borderWidth: 2, borderColor: "black" }}
            >
                <ChatOutput messages={messages} />
                <View style={{ width: `${100}%`, flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        ref={r => this.chatInput = r}
                        placeholder="  chat"
                        style={{ width: `${75}%`, backgroundColor: "white", borderRadius: 15, padding: 10, margin: 10 }}
                        onChangeText={e => handleInputValue(e)}
                    />
                    <TouchableOpacity onPress={this.handlePressSend}>
                        <Icon name="send" color="skyblue" size={30} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressHeart}>
                        <Image source={require('../images/ico_heart.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
            </KeyboardAccessoryView >
        )
    }
}


