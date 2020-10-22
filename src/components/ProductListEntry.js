import React, { Children } from 'react'
import { View, Modal, Dimensions } from 'react-native'
import { Text, Button, Input, Image, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel';


export default class ProductListEntry extends React.Component {
    constructor(props) {
        super(props)
        this._renderItem = this._renderItem.bind(this)

    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 10, padding: 10, alignItems: "center" }} >
                <Image source={{ uri: item }} style={{ width: 250, height: 250, borderRadius: 20 }} />
            </View>
        );
    }
    render() {
        let { productInfo, navigation, list } = this.props
        let { title, price } = productInfo
        const horizontalMargin = 20;
        const slideWidth = 280;
        const sliderWidth = Dimensions.get('window').width;
        const itemWidth = slideWidth + horizontalMargin * 2;
        const itemHeight = 200;
        return (

            <ListItem bottomDivider style={{ width: "100%" }} containerStyle={{ margin: 0 }} onPress={() => navigation.navigate('ProductDetail', { info: productInfo, list: list })}>
                <ListItem.Content style={{ alignItems: "center" }}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.props.productInfo.image}
                        renderItem={this._renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        itemHeight={itemHeight}
                    />
                    <ListItem.Title style={{ letterSpacing: 1.5 }}>{title}</ListItem.Title>
                    <ListItem.Subtitle style={{ letterSpacing: 2 }}>{price}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
}
