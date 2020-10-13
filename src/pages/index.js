import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, Header } from '@react-navigation/stack';
import Signin from './Signin/Signin'
import FeedIndex from './Feed/index'

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="FeedIndex" component={FeedIndex} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}