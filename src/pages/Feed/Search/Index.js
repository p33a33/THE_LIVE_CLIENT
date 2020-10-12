import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search'
import SearchResult from './SearchResult/SearchResult'
import Watching from '../Watching/Watching'
import SellerIndex from '../../SellerHome/Index.js'
import Feed from '../Feed'

const Stack = createStackNavigator();
export default function SearchIndex() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SearchResult" component={SearchResult} />
            <Stack.Screen name="Watching" component={Watching} />
            <Stack.Screen name="SellerHome" component={SellerIndex} />
        </Stack.Navigator>
    )
}
