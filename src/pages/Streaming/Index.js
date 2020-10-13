import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import OnAir from './OnAir/OnAir'
import StreamingReady from './Streaming'

const Stack = createStackNavigator();
export default function SellerHomeIndex() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Ready" component={StreamingReady} />
            <Stack.Screen name="OnAir" component={OnAir} />
        </Stack.Navigator>
    )
}
