import React from 'react'
import { View, Text, Button } from 'react-native'


export default class StreamingReady extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's StreamingReady Page</Text>
                <Button title="On Air" onPress={() => this.props.navigation.navigate('OnAir')} />
            </View>
        )
    }
}

