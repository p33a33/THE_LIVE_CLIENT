import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './ProductList';
import ProductDetail from '../../ProductDetail/ProductDetail';
import SellerHome from '../../SellerHome/SellerHome';


const Stack = createStackNavigator();
export default function ProductListIndex() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="SellerHome" component={SellerHome} />
        </Stack.Navigator>
    )
}
