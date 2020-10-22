import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WatchingIndex from './Watching/Index'
import SearchIndex from './Search/Index'
import MypageIndex from './Mypage/Index'
import StreamingIndex from '../Streaming/Index';
import ProductListIndex from './ProductList/Index';

const Tab = createBottomTabNavigator();
export default function FeedIndex() {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Feed" component={WatchingIndex} />
            <Tab.Screen name="ProductList" component={ProductListIndex} />
            <Tab.Screen name="Streaming" component={StreamingIndex} options={{ tabBarVisible: false }} />
            <Tab.Screen name="Search" component={SearchIndex} />
            <Tab.Screen name="Mypage" component={MypageIndex} />
        </Tab.Navigator>
    )
}
