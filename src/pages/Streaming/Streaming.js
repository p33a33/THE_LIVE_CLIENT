import React from 'react'
import { View, Text, Button } from 'react-native'

export default class Streaming extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's Streaming Page</Text>
            </View>
        )
    }
}

