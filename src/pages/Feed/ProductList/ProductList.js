import React from 'react'
import { View, Image } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import ProductListEntry from '../../../components/ProductListEntry'

export default class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }

    list = [{ image: "1", image2: "1", image3: "1", title: "Product 1", body: "대단한 상품", price: "₩ 860,000" },
    { image: "2", image2: "2", image3: "2", title: "Product 2", body: "멋진 상품", price: "₩ 5,100,000" },
    { image: "3", image2: "3", image3: "3", title: "Product 3", body: "좋은 상품", price: "₩ 60,000" },
    { image: "4", image2: "4", image3: "4", title: "Product 4", body: "갖고싶은 상품", price: "₩ 150,000" },
    { image: "5", image2: "5", image3: "5", title: "Product 5", body: "선물하고싶은 상품", price: "₩ 5,000" }]

    render() {
        return (
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <Text h4>it's ProductList Page</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Recommended Itmes</Text>
                { this.list.map((product, index) => <ProductListEntry key={index} productInfo={product} navigation={this.props.navigation} />)}
            </ScrollView >
        )
    }
}

