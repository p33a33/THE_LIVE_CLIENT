import Axios from 'axios'
import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'
import SocketManager from '../../socketManager'

export default class StreamingReady extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: null,
            body: null,
            status: 'PREPARE',
            product: [],
            broadcastId: null
        }
    }

    handlePressOnAir = () => {
        let { title, body } = this.state
        SocketManager.instance.emitPrepareLiveStream({ title: title, body: body });
        this.props.navigation.navigate('OnAir', { handleVisible: this.props.route.params.handleVisible, userInfo: this.props.route.params.userInfo });
    }

    handleStatus = (name, val) => {
        this.setState({ [name]: val })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: "center", padding: 30 }}>
                <Text>it's StreamingReady Page</Text>
                <Input placeholder="Title" onChangeText={e => this.handleStatus('title', e)} />
                <TextInput style={{ textAlignVertical: "top", width: `${100}%`, height: `${30}%` }} placeholder="Description" onChangeText={e => this.handleStatus('body', e)} />
                <Button title="On Air" onPress={this.handlePressOnAir} />
            </View>
        )
    }
}

