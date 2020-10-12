import React from 'react'
import { View, Text, Button } from 'react-native'

export default class MyItemList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's MyItemList Page</Text>
                <Button title="Add Item" onPress={() => this.props.navigation.navigate('AddItem')}></Button>
            </View>
        )
    }
}

