import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's SearchResult Page</Text>
                <Button title="Thumbnail" onPress={() => this.props.navigation.navigate('Watching')}></Button>
                <Button title="SellerHome" onPress={() => this.props.navigation.navigate('SellerHome')}></Button>
                <Button title="Go back" onPress={this.props.navigation.goBack} />
            </View>
        )
    }
}

