import React from 'react';
import { Dimensions, ScrollView, Text, View, PanResponder, Animated } from 'react-native'
import { Card, Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';

export default class StreamingItems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pan: new Animated.ValueXY()
        }

        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y },
            ]),
            onPanResponderRelease: (e, gestureState) => {
                this.state.pan.setOffset({ x: this._val.x, y: this._val.y });
                this.state.pan.setValue({ x: 0, y: 0 });
            },
        });
    };

    componentDidMount = () => {
        this._val = { x: 0, y: 0 }
        this.state.pan.addListener((value) => this._val = value)
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ marginLeft: `${5}%`, width: `${30}%` }}>
                <Card containerStyle={{ padding: 5 }}>
                    <Card.Title style={{ fontSize: 10 }} numberOfLines={1} ellipsizeMode="tail">{item.title}</Card.Title>
                    <View style={{ alignSelf: "center" }}>
                        <TouchableOpacity>
                            <Image source={{ uri: item.image[0] }} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: "center", marginTop: `${5}%`, marginBottom: `${5}%`, fontSize: 10 }}>{item.price}</Text>
                </Card>
            </View>
        )
    }

    render() {
        let { list } = this.props
        let panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        let horizontalMargin = 5
        let slideWidth = Dimensions.get('window').width;
        let sliderWidth = Dimensions.get('window').width;
        let itemWidth = slideWidth + horizontalMargin * 2;
        let itemHeight = 100;
        return (
            <Animated.View {...this.PanResponder.panHandlers} style={[panStyle]} >
                <ScrollView
                    style={{
                        marginLeft: `${60}%`,
                        width: `${40}%`,
                        backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    }}>
                    <Carousel
                        ref={(c) => { this.carousel = c; }}
                        data={list}
                        renderItem={this.renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        itemHeight={itemHeight}
                    />
                </ScrollView>
            </Animated.View >
        )
    }
}