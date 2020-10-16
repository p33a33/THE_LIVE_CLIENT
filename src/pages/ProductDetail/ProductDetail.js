import React, { Children } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { Text, Button, Input, Image, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel';

export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inWishlist: false,
        }
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this._renderItem = this._renderItem.bind(this)
    }

    handleButtonPress = (index) => {
        switch (index) {
            case 0:
                this.setState({ inWishlist: !this.state.inWishlist })
                if (this.state.inWishlist) {
                    alert('This item has added on your wish list')
                } else {
                    alert(' No more interesting? ')
                }
        }
    }
    _renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 10, padding: 10, alignItems: "center" }} >
                {console.log(item)}
                <Image source={{ uri: item }} style={{ width: 300, height: 300, borderRadius: 20 }} />
            </View>
        );
    }
    render() {
        let { image, image2, image3, title, body, price } = this.props.route.params.info
        const horizontalMargin = 20;
        const slideWidth = 280;

        const sliderWidth = Dimensions.get('window').width;
        const itemWidth = slideWidth + horizontalMargin * 2;
        const itemHeight = 200;

        return (
            <ScrollView contentContainerStyle={{ flex: 1, padding: 20 }}
            >
                <Text h4 style={{ textAlign: 'left' }}>it's ProductDetail Page</Text>
                <View style={{ alignItems: "center" }} >
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.props.route.params.info.image}
                        renderItem={this._renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        itemHeight={itemHeight}
                    />
                </View>
                <Text h4 style={{ letterSpacing: 1.5, textAlign: "center" }}>{title}</Text>
                <Text style={{ letterSpacing: 2, fontSize: 15, textAlign: "center", marginBottom: 50 }}>{price}</Text>
                <Text style={{ fontSize: 15, }}>{body}</Text>

                <ButtonGroup
                    onPress={this.handleButtonPress}
                    buttons={['Add to wishlist', 'Buy now']}
                />
            </ScrollView>
        )
    }
}

