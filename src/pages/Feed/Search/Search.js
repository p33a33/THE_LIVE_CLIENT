import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'

export default class Search extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's Search Page</Text>
                <Input></Input>
                <Button title="Search" onPress={() => this.props.navigation.navigate('SearchResult')} />
            </View>
        )
    }
}

