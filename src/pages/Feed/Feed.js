import Axios from 'axios';
import React from 'react'
import { FlatList, RefreshControl, View, ScrollView, StyleSheet, ListView } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'
import { min } from 'react-native-reanimated';
import SearchDefaultEntry from '../../components/SearchDefaultEntry';
import { SERVER, YOUTUBE_API_KEY } from '../config'
import { searchYouTube } from '../Feed/searchYouTube';
import { BoxShadow } from 'react-native-shadow'

export default class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribeVids: [],
            popularVids: [],
            refreshing: false,
            dragging: false,
            currentIndex: 0,
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

    handleSignout = () => {
        Axios.get(`${SERVER}/signout`)
            .then(data => {
                this.props.navigation.navigate('Signin')
            })
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
            <View className="video-list-entry" style={styles.listItems} >
                <BoxShadow setting={shadowOpt}>
                    <Image className="media-thumbnail"
                        style={{
                            height: 400, width: 250, borderRadius: 20,
                        }}
                        source={{ uri: imgSrc }}
                        onPress={() => {
                            this.props.navigation.navigate('Watching')
                        }}
                    >
                        <View className="media-body"  >
                            <Text className="video-list-entry-title" style={styles.itemTitle} onPress={() => this.props.navigation.navigate('Watching')} >
                                {this.ConvertSystemSourcetoHtml(item.snippet.title.toUpperCase())}
                            </Text>
                        </View>
                    </Image>
                </BoxShadow>
            </View >
        )
    }
    header() {
        return (
            <View style={{
                backgroundColor: "white",
                padding: 5
            }}>
                <Text style={styles.title} onPress={(() => this.FlatList.current.scrollToOffset({ animated: true, offset: 0 }))}>
                    FEED PAGE
                    </Text>
            </View>
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
            <>
                <Button title="Logout" onPress={this.handleSignout} />
                <FlatList
                    ref={this.FlatList}
                    ListHeaderComponent={this.header.bind(this)}
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
            </>
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
        marginTop: 5,
        flexDirection: "column",
        flex: 1,
    },
    title: {
        textAlign: "center",
        letterSpacing: 2,
        fontWeight: "bold",

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


