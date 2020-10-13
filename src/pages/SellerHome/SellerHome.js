import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'

export default class SellerHome extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's SellerHome Page</Text>
                <Button title="Product" onPress={() => this.props.navigation.navigate('ProductDetail')} />
                <Button title="Streaming Thumbnail" onPress={() => this.props.navigation.navigate('Watching')} />
            </View>
        )
    }
}

