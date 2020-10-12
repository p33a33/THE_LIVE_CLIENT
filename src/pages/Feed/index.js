import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import WatchingIndex from './Watching/Index'
import SearchIndex from './Search/Index'
import MypageIndex from './Mypage/Index'
import Streaming from '../Streaming/Streaming';
import ProductList from './ProductList/ProductLsit';

const Tab = createBottomTabNavigator();
export default function FeedIndex() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Feed" component={WatchingIndex} />
            <Tab.Screen name="ProductList" component={ProductList} />
            <Tab.Screen name="Streaming" component={Streaming} />
            <Tab.Screen name="Search" component={SearchIndex} />
            <Tab.Screen name="Mypage" component={MypageIndex} />
        </Tab.Navigator>
    )
}
