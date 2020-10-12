import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'

export default class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's ProductList Page</Text>
                <TextInput></TextInput>
            </View>
        )
    }
}

