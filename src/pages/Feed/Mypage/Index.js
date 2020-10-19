import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FollowingListIndex from './FollowingList/Index'
import MyItemListIndex from './MyItemList/Index'
import OrderInfoIndex from './OrderInfo/Index'
import UserInfoEdit from './UserInfoEdit/UserInfoEdit.js'
import WishList from './WishList/WishList.js'
import Mypage from './Mypage'


const Drawer = createDrawerNavigator();

export default function MypageIndex() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Mypage" component={Mypage} />
            <Drawer.Screen name="UserInfoEdit" component={UserInfoEdit} />
            <Drawer.Screen name="OrderInfo" component={OrderInfoIndex} />
            <Drawer.Screen name="FollowingList" component={FollowingListIndex} />
            <Drawer.Screen name="MyItemLIst" component={MyItemListIndex} />
            <Drawer.Screen name="WishList" component={WishList} />
        </Drawer.Navigator>
    )
}
