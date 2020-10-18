import React, { Children } from 'react'
import { View, Modal, Dimensions } from 'react-native'
import { Text, Button, Input, Image, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import OrderInfo from '../pages/Feed/Mypage/OrderInfo/OrderInfo'


export default class OrderListEntry extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { orderInfo, navigation } = this.props
        let { title, price, image } = orderInfo.product
        return (

            <ListItem bottomDivider style={{ width: "100%" }} containerStyle={{ margin: 0, alignContent: "center" }} onPress={() => navigation.navigate('ProductDetail', { info: orderInfo.product })}>
                <ListItem.Content style={{ flexDirection: "row" }}>
                    <Image source={{ uri: image[0] }} style={{ width: 90, height: 90 }} />
                    <View style={{ marginLeft: 100, alignSelf: "center" }}>
                        <ListItem.Title style={{ letterSpacing: 1.5 }}>{title}</ListItem.Title>
                        <ListItem.Subtitle style={{ letterSpacing: 2, textAlign: "right" }}>{price}원</ListItem.Subtitle>
                        <ListItem.Subtitle style={{ letterSpacing: 2, textAlign: "right" }}>{orderInfo.quantity}개</ListItem.Subtitle>
                        <ListItem.Subtitle style={{ letterSpacing: 2, textAlign: "right" }}>{Number(orderInfo.quantity) * price}원</ListItem.Subtitle>
                    </View>
                </ListItem.Content>
            </ListItem>
        )
    }
}
