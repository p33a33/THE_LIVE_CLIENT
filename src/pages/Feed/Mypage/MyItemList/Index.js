import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyItemList from './MyItemList'
import AddItem from './AddItem/AddItem'

const Stack = createStackNavigator();
export default function MyItemListIndex() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="MyItemList" component={MyItemList} />
            <Stack.Screen name="AddItem" component={AddItem} />
        </Stack.Navigator>
    )
}
