import React, { Children } from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Button, Input, Image, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inWishlist: false
        }
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

    render() {
        let { image, image2, image3, title, body, price } = this.props.route.params.info
        return (
            <ScrollView contentContainerStyle={{ flex: 1, padding: 20 }}>
                <Text h4 style={{ textAlign: 'left' }}>it's ProductDetail Page</Text>
                <View style={{ alignItems: "center" }}>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ width: `${100 * Children.length}%` }}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={250}
                        decelerationRate="fast"
                        pagingEnabled
                        style={{ width: 250, marginBottom: 10 }}>
                        <Image style={{ backgroundColor: "blue", width: 250, height: 250, }} resizeMode="contain" />
                        {image2 && <Image style={{ backgroundColor: "red", width: 250, height: 250 }} resizeMode="contain" />}
                        {image3 && <Image style={{ backgroundColor: "yellow", width: 250, height: 250 }} resizeMode="contain" />}
                    </ScrollView>
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

