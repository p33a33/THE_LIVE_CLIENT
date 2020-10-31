import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Watching from './Watching'
import Feed from '../Feed'

const Stack = createStackNavigator();
export default function WatchingIndex(props) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Feed" component={Feed} initialParams={{ userInfo: props.route.params.userInfo, handleVisible: props.route.params.handleVisible }} />
            <Stack.Screen name="Watching" component={Watching} initialParams={{ userInfo: props.route.params.userInfo }} />
        </Stack.Navigator>
    )
}
