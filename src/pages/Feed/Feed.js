import React from 'react'
import { FlatList, RefreshControl, View, ScrollView, StyleSheet, ListView } from 'react-native'
import { searchYouTube } from '../Feed/searchYouTube';
import LinearGradient from 'react-native-linear-gradient';
import { CustomHeader } from '../../components/CustomHeader';
import { Text, Button, Image } from 'react-native-elements'
import { SERVER, YOUTUBE_API_KEY } from '../config'
import { BoxShadow } from 'react-native-shadow'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribeVids: [],
            popularVids: [],
            refreshing: false,
            dragging: false,
            currentIndex: 0,
            userInfo: this.props.route.params.userInfo
        }
        this.FlatList = React.createRef()
        this.fetchData = this.fetchData.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.ConvertSystemSourcetoHtml = this.ConvertSystemSourcetoHtml.bind(this)
        this.fetchNewData = this.fetchNewData.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }
    ConvertSystemSourcetoHtml(str) {
        str = str.replace("&lt;", "<");
        str = str.replace("&gt;", ">");
        str = str.replace("&quot;", '"');
        str = str.replace("&quot;", '"');
        str = str.replace("&#39;", "'");
        str = str.replace("&#39;", "'");

        return str;
    }


    fetchData() {
        let initOption = {
            query: 'vertical+video',
            max: 5,
            key: YOUTUBE_API_KEY
        }
        searchYouTube(initOption, (data) => this.setState({ subscribeVids: this.state.subscribeVids.concat(data) }))
        console.log("fetchData Called")
    }
    async fetchNewData() {
        let initOption = {
            query: 'vevo',
            max: 5,
            key: YOUTUBE_API_KEY
        }
        await this.setState({
            refreshing: true,
        })
        await searchYouTube(initOption, (data) => this.setState({ subscribeVids: data.concat(this.state.subscribeVids) }))
        await this.setState({
            refreshing: false,
        })
        await console.log("fetchNewData Called");
    }

    renderItem({ item }) {
        let imgSrc = item.snippet.thumbnails.high.url
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Watching', { title: `${item.title}` })
            }} >
                <View className="video-list-entry" style={styles.listItems} >
                    <BoxShadow setting={shadowOpt}>
                        <Image className="media-thumbnail"
                            style={{
                                height: 400, width: 250, borderRadius: 20,
                            }}
                            source={{ uri: imgSrc }}
                        >
                            <View className="media-body"  >
                                <Text className="video-list-entry-title" style={styles.itemTitle}>
                                    {this.ConvertSystemSourcetoHtml(item.snippet.title.toUpperCase())}
                                </Text>
                            </View>
                        </Image>
                    </BoxShadow>
                </View >
            </TouchableOpacity>
        )
    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }
    render() {
        return (

            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1 }}>
                <FlatList
                    ref={this.FlatList}
                    ListHeaderComponent={<CustomHeader navigation={this.props.navigation} />}
                    stickyHeaderIndices={[0]}
                    flatListItemSeparator={this.FlatListItemSeparator.bind(this)}
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.fetchNewData()}
                            color="black"
                        />}
                    onScroll={e => { e.nativeEvent.contentOffset.y }}
                    onLayout={e => { this.flatListTopOffset = e.nativeEvent.layout.y }}
                    numColumns={1}
                    data={this.state.subscribeVids}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => String(index)}
                    onEndReached={this.fetchData}
                    onEndReachedThreshold={1}
                />
            </LinearGradient>

        )
    }
}
const shadowOpt = {
    width: 250,
    height: 400,
    color: "#000",
    border: 9,
    radius: 20,
    opacity: 0.2,
    x: 0,
    y: 5,
    style: { marginVertical: 5 }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    title: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: 25,
        padding: 5,
        fontFamily: "sans-serif-light",

    },
    listItems: {
        height: 400,
        width: 250,
        borderRadius: 20,
        alignSelf: "center",
        paddingBottom: 30,
        paddingTop: 20,
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20,
    },
    itemTitle: {
        color: "white",
        padding: 10,
        marginTop: 230,
        textAlign: "center",
        textShadowRadius: 6,
        textShadowOffset: { width: 0, height: 2 },
        textShadowColor: "#222222bc",
        fontSize: 18,
        fontWeight: "bold"
    }
});

