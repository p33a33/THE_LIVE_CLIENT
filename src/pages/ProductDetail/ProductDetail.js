import React, { Children } from 'react'
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native'
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
        let { title, body, price } = this.props.route.params.info
        const horizontalMargin = 20;
        const slideWidth = 280;
        const sliderWidth = Dimensions.get('window').width;
        const itemWidth = slideWidth + horizontalMargin * 2;
        const itemHeight = 200;
        let { navigation } = this.props
        let { navigate } = navigation
        console.log(this)

        return (
            <View style={{ flex: 1, padding: 20 }}>
                <Text h4 style={{ textAlign: 'left' }}>it's ProductDetail Page</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: "center" }}  >
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
                    <View style={styles.sellerContainer}>
                        <Text style={styles.sellerTitle}>{this.props.route.params.info.name}</Text>
                        <View style={styles.sellerInfoContainer}>
                            <View>
                                <Text style={styles.sellerContainerText}>
                                    Rate
                                    {"\n"}
                                    9.3
                                    </Text>
                            </View>
                            <View>
                                <Text style={styles.sellerContainerText}>
                                    Products
                                    {"\n"}
                                    271
                                    </Text>
                            </View>
                            <View>
                                <Text style={styles.sellerContainerText}>
                                    Follower
                                    {"\n"}
                                    5.3k
                                    </Text>
                            </View>
                        </View>
                        <Button
                            onPress={() => navigate('SellerHome')}
                            title="go to Seller Home"
                        />
                    </View>
                    <View style={{ alignItems: "center", }}>
                        {this.props.route.params.info.image.map((ele) => {
                            return (
                                <Image
                                    source={{ uri: ele }}
                                    style={{
                                        width: 250,
                                        height: 250,
                                        padding: 5
                                    }}
                                />
                            )
                        })}
                    </View>
                    <View style={styles.sellerItms}>
                        {this.props.route.params.list.map((itm) => {
                            let imgSrc = itm.image[0]
                            return (
                                <View className="video-list-entry" style={styles.listItems} >
                                    <View >
                                        <Image className="media-thumbnail"
                                            style={{ height: 130, width: 130 }}
                                            source={{ uri: imgSrc }}
                                            onPress={() => this.props.navigation.navigate('ProductDetail')}
                                        />
                                        <View className="media-body" >
                                            <Text className="video-list-entry-title" onPress={() => this.props.navigation.navigate('ProductDetail')} >
                                                {itm.title}
                                            </Text>
                                        </View>
                                    </View>
                                </View >
                            )
                        })
                        }
                    </View>
                </ScrollView >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sellerContainer: {
        margin: 5,
        padding: 5
    },
    sellerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 5
    },
    sellerInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        textAlign: "auto"
    },
    sellerContainerText: {
        textAlign: "center",
        padding: 5
    },
    sellerItms: {
        justifyContent: "space-around",
        marginTop: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "flex-start",
    }
})