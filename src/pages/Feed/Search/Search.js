import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'

export default class Search extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's Search Page</Text>
                <TextInput></TextInput>
                <Button title="Search" onPress={() => this.props.navigation.navigate('SearchResult')} />
            </View>
        )
    }
}

