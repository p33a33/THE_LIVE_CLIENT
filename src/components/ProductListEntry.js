import React, { Children } from 'react'
import { View, Modal } from 'react-native'
import { Text, Button, Input, Image, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ProductListEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { productInfo, navigation } = this.props
        let { image, image2, image3, title, price } = productInfo
        return (
            <ListItem bottomDivider style={{ width: "100%" }} containerStyle={{ margin: 0 }} onPress={() => navigation.navigate('ProductDetail', { info: productInfo })}>
                <ListItem.Content style={{ alignItems: "center" }}>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ width: `${100 * Children.length}%` }}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={250}
                        decelerationRate="fast"
                        pagingEnabled
                        style={{ width: 250, marginBottom: 10 }}>
                        <Image style={{ backgroundColor: "blue", width: 250, height: 250 }} resizeMode="contain" />
                        {image2 && <Image style={{ backgroundColor: "red", width: 250, height: 250 }} resizeMode="contain" />}
                        {image3 && <Image style={{ backgroundColor: "yellow", width: 250, height: 250 }} resizeMode="contain" />}
                    </ScrollView>
                    <ListItem.Title style={{ letterSpacing: 1.5 }}>{title}</ListItem.Title>
                    <ListItem.Subtitle style={{ letterSpacing: 2 }}>{price}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
}
