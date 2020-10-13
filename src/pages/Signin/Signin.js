import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'

export default class Signin extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={() => {
                    this.props.navigation.navigate('FeedIndex')
                }} title="Login" />
                <Text>it's Signin Page</Text>
            </View>
        )
    }
}



