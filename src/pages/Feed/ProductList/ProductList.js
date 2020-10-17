import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import ProductListEntry from '../../../components/ProductListEntry'

export default class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }

    list = [
        { name: "맥도날드", id: "1001", email: "seller1@test.com", image: ["https://image.thehyundai.com/static/8/6/8/18/A1/hnm40A1188689_0901685003_202002_LB_0661_Q8_L_1120x868_srgb_848.jpg", "https://image.thehyundai.com/static/8/6/8/18/A1/hnm40A1188689_02_0901685_003_001_848.jpg"], title: "Product 1", body: "대단한 상품", price: "₩ 860,000" },
        { name: "다이소", id: "1002", email: "seller2@test.com", image: ['https://cdn2.chrono24.com/images/uhren/16000731-5d7hntuyfucwgmqbuxikbm3u-Zoom.jpg', "https://cdn2.chrono24.com/images/uhren/16000731-w99felxi7r8kz35j2rgbiomy-Zoom.jpg", "https://cdn2.chrono24.com/images/uhren/16000731-nwj6pphl2uxobwbrqm15doii-Zoom.jpg"], title: "Product 2", body: "멋진 상품", price: "₩ 5,100,000" },
        { name: "홈플러스", id: "1003", email: "seller3@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1381554_1_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/1381554_5_zoom.jpg', "https://assetsprx.matchesfashion.com/img/product/1381554_6_zoom.jpg"], title: "Product 4", body: "갖고싶은 상품", price: "₩ 150,000" },
        { name: "경발원", id: "1004", email: "seller4@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1360764_1_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/outfit_1360764_1_zoom.jpg', "https://assetsprx.matchesfashion.com/img/product/1360764_3_zoom.jpg"], title: "Product 3", body: "좋은 상품", price: "₩ 60,000" },
        { name: "봉구비어", id: "1005", email: "seller5@test.com", image: ["https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_01_0948433_001_001_848.jpg", 'https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_01_0948433_001_003_848.jpg', "https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_02_0948433_001_001_848.jpg"], title: "Product 5", body: "선물하고싶은 상품", price: "₩ 5,000" }]

    render() {
        return (
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <Text h4>Shop</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Trending</Text>
                { this.list.map((product, index, array) => <ProductListEntry key={index} list={array} productInfo={product} navigation={this.props.navigation} />)}
            </ScrollView >
        )
    }
}

