import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FollowingList from './FollowingList/FollowingList'
import MyItemList from './MyItemList/MyItemList.js'
import OrderedList from './OrderedList/OrderedList'
import OrderInfo from './OrderInfo/OrderInfo'
import UserInfoEdit from './UserInfoEdit/UserInfoEdit.js'
import WishList from './WishList/WishList.js'
import Mypage from './Mypage'


const Drawer = createDrawerNavigator();

export default function MypageIndex() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Mypage" component={Mypage} />
            <Drawer.Screen name="UserInfoEdit" component={UserInfoEdit} />
            <Drawer.Screen name="OrderInfo" component={OrderInfo} />
            <Drawer.Screen name="FollowingList" component={FollowingList} />
            <Drawer.Screen name="MyItemLIst" component={MyItemList} />
            <Drawer.Screen name="OrderedList" component={OrderedList} />
            <Drawer.Screen name="WishList" component={WishList} />
        </Drawer.Navigator>
    )
}
