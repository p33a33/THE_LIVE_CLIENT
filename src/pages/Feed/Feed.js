import React from 'react'
import { RefreshControl, View, ScrollView, StyleSheet, ListView } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import { min } from 'react-native-reanimated';
import SearchDefaultEntry from '../../components/SearchDefaultEntry';
import { YOUTUBE_API_KEY } from '../config'
import { searchYouTube } from '../Feed/searchYouTube';


export default class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribeVids: [],
            popularVids: [],
            refreshing: false
        }
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
            <View className="video-list-entry" style={{
                width: "100%", alignItems: "center",
            }} >
                <Image className="media-thumbnail"
                    style={styles.listItems}
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
            </View >
        )
    }
    render() {
        return (
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.fetchNewData}
                        color="black"
                    />}
            >
                <FlatList
                    enableEmptySections={true}
                    data={this.state.subscribeVids}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => String(index)}
                    onEndReached={this.fetchData}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        marginTop: 5,
        flexDirection: "column",
        flexWrap: "wrap",
        flex: 1,
        overflow: "scroll",
        backgroundColor: "beige"
    },
    listItems: {
        height: 400, width: 250, borderRadius: 20,
        padding: 30,
        margin: 20,
        overflow: "visible",
        shadowOffset: { width: 0, height: 100 },
        shadowColor: '#000',
        shadowOpacity: 100,
        shadowRadius: 100,
        elevation: 10,
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


