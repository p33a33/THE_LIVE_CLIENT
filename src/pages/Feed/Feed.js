import React from 'react'
import { View, ScrollView, StyleSheet, ListView } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import { min } from 'react-native-reanimated';
import { YOUTUBE_API_KEY } from '../config'
import { searchYouTube } from '../Feed/searchYouTube';


export default class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribeVids: [],
            popularVids: [],
        }
        this.fetchData = this.fetchData.bind(this)
        this.renderItem = this.renderItem.bind(this)
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData() {
        let initOption = {
            query: 'vertical+video',
            max: 5,
            key: YOUTUBE_API_KEY
        }
        searchYouTube(initOption, (data) => this.setState({ subscribeVids: this.state.subscribeVids.concat(data) }))
    }
    renderItem({ item }) {
        let imgSrc = item.snippet.thumbnails.high.url
        return (
            <View className="video-list-entry" style={styles.listItems} >
                <Image className="media-thumbnail"
                    style={{ height: 400, width: 250, borderRadius: 20 }}
                    source={{ uri: imgSrc }}
                    onPress={() => {
                        this.props.navigation.navigate('Watching')
                    }}
                >
                    <View className="media-body"  >
                        <Text className="video-list-entry-title" style={styles.itemTitle} onPress={() => this.props.navigation.navigate('Watching')} >
                            {item.snippet.title}
                        </Text>
                    </View>
                </Image>
            </View >
        )
    }
    render() {
        return (
            <>
                <Text style={styles.title}>Feed Page</Text>
                <FlatList
                    data={this.state.subscribeVids}
                    renderItem={this.renderItem}
                    style={styles.container}
                    keyExtractor={(item, index) => String(index)}
                    onScrollEndDrag={this.fetchData}
                >
                </FlatList>
            </>
        )
    }
}

const styles = StyleSheet.create({

    title: {
        margin: 5,
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    container: {
        alignContent: "center",
        marginTop: 5,
        flexDirection: "column",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        backgroundColor: "#f2f2f2",
    },
    listItems: {
        alignItems: "center",
        padding: 10,
        width: "100%",
    },
    itemTitle: {
        color: "white",
        padding: 10,
        marginTop: 250,
        textAlign: "center",
        textShadowRadius: 8,
        textShadowOffset: { width: 4, height: 4 },
        textShadowColor: "#222222bc",
        fontSize: 18,
        fontWeight: "bold"
    }
});


