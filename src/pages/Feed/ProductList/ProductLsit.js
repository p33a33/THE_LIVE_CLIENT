import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'

export default class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's ProductList Page</Text>
            </View>
        )
    }
}

