import React from 'react'
import { View, Text, Button } from 'react-native'

export default class Signin extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>it's Signin Page</Text>
                </View>
                <View>
                    <Button onPress={() => {
                        this.props.navigation.navigate('FeedIndex')
                    }} title="Login" />
                </View>
            </View>
        )
    }
}



