import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input, ListItem, Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import OrderListEntry from '../../../../components/OrderListEntry'

export default class OrderInfo extends React.Component {
    constructor(props) {
        super(props)

        this.dummyOrder = [{
            id: "81272",
            product: { name: "봉구비어", id: "1005", email: "seller5@test.com", image: ["https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_01_0948433_001_001_848.jpg", 'https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_01_0948433_001_003_848.jpg', "https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_02_0948433_001_001_848.jpg"], title: "Product 5", body: "선물하고싶은 상품", price: 5000 },
            quantity: 3,
            address: "서울특별시 강남구 봉은사로 1",
            phoneNum: "010-0000-0000",
            status: "yet"
        },
        {
            id: "81273",
            product: { name: "맥도날드", id: "1001", email: "seller1@test.com", image: ["https://image.thehyundai.com/static/8/6/8/18/A1/hnm40A1188689_0901685003_202002_LB_0661_Q8_L_1120x868_srgb_848.jpg", "https://image.thehyundai.com/static/8/6/8/18/A1/hnm40A1188689_02_0901685_003_001_848.jpg"], title: "Product 1", body: "대단한 상품", price: 860000 },
            quantity: 1,
            address: "서울특별시 강남구 봉은사로 1",
            phoneNum: "010-0000-0000",
            status: "yet"
        },
        {
            id: "81274",
            product: { name: "다이소", id: "1002", email: "seller2@test.com", image: ['https://cdn2.chrono24.com/images/uhren/16000731-5d7hntuyfucwgmqbuxikbm3u-Zoom.jpg', "https://cdn2.chrono24.com/images/uhren/16000731-w99felxi7r8kz35j2rgbiomy-Zoom.jpg", "https://cdn2.chrono24.com/images/uhren/16000731-nwj6pphl2uxobwbrqm15doii-Zoom.jpg"], title: "Product 2", body: "멋진 상품", price: 5100000 },
            quantity: 2,
            address: "서울특별시 강남구 봉은사로 1",
            phoneNum: "010-0000-0000",
            status: "done"
        },
        {
            id: "81275",
            product: { name: "홈플러스", id: "1003", email: "seller3@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1381554_1_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/1381554_5_zoom.jpg', "https://assetsprx.matchesfashion.com/img/product/1381554_6_zoom.jpg"], title: "Product 4", body: "갖고싶은 상품", price: 150000 },
            quantity: 5,
            address: "서울특별시 강남구 봉은사로 1",
            phoneNum: "010-0000-0000",
            status: "done"
        },
        {
            id: "81275",
            product: { name: "경발원", id: "1004", email: "seller4@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1360764_1_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/outfit_1360764_1_zoom.jpg', "https://assetsprx.matchesfashion.com/img/product/1360764_3_zoom.jpg"], title: "Product 3", body: "좋은 상품", price: 60000 },
            quantity: 15,
            address: "서울특별시 강남구 봉은사로 1",
            phoneNum: "010-0000-0000",
            status: "done"
        },
        ]
    }

    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <Text h4 style={{ textAlign: "left", marginBottom: 20 }}>처리중인 주문</Text>
                {this.dummyOrder.map(order => {
                    if (order.status === "yet") {
                        return <Card containerStyle={{ padding: 10 }}>
                            <Card.Title>
                                <OrderListEntry orderInfo={order} navigation={this.props.navigation} />
                            </Card.Title>
                            <Card.Divider />
                            <Text>Order# : {order.id}</Text>
                            <Text>Address : {order.address}</Text>
                            <Text>Contact : {order.phoneNum}</Text>
                            <Text>Status : {order.status} </Text>
                        </Card>
                    }
                })
                }
                <Text h4 style={{ textAlign: "left", marginTop: 20, marginBottom: 20 }}>완료된 주문</Text>
                {this.dummyOrder.map(order => {
                    if (order.status === "done") {
                        return <Card containerStyle={{ minWidth: "90%" }}>
                            <Card.Title>
                                <OrderListEntry orderInfo={order} navigation={this.props.navigation} />
                            </Card.Title>
                            <Card.Divider />
                            <Text>Order# : {order.id}</Text>
                            <Text>Address : {order.address}</Text>
                            <Text>Contact : {order.phoneNum}</Text>
                            <Text>Status : {order.status} </Text>
                        </Card>
                    }
                })
                }
            </ScrollView>
        )
    }
}

