import React from 'react'
import { View, Text, Button } from 'react-native'

export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's ProductDetail Page</Text>
                <Button title="Buy now" />
                <Button title="Add to Wishlist" />
            </View>
        )
    }
}

