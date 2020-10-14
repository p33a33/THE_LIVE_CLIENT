import React from 'react'
import { View, ScrollView, StyleSheet, ListView } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'
import { min } from 'react-native-reanimated';
import { YOUTUBE_API_KEY } from '../Feed/config/youtube';
import { searchYouTube } from '../Feed/searchYouTube';


export default class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribeVids: [],
            popularVids: [],
        }
    }
    componentDidMount() {
        let initOption = {
            query: 'storror',
            max: 10,
            key: YOUTUBE_API_KEY
        }
        searchYouTube(initOption, (data) => this.setState({ subscribeVids: data }))
    }

    render() {
        return (
            <ScrollView >
                <Text style={styles.title}>Feed Page</Text>
                <View style={styles.container}>
                    {this.state.subscribeVids.map((vid) => {
                        let imgSrc = vid.snippet.thumbnails.default.url
                        return (
                            <View className="video-list-entry" style={styles.listItems} >
                                <View >
                                    <Image className="media-thumbnail"
                                        style={{ height: 400, width: 250, borderRadius: 20 }}
                                        source={{ uri: imgSrc }}
                                        onPress={() => this.props.navigation.navigate('Watching')}
                                    >
                                        <View className="media-body"  >
                                            <Text className="video-list-entry-title" style={styles.itemTitle} onPress={() => this.props.navigation.navigate('Watching')} >
                                                {vid.snippet.title}
                                            </Text>
                                        </View>
                                    </Image>
                                </View>
                            </View >
                        )
                    })
                    }
                </View>
            </ScrollView >
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
        justifyContent: "space-around",
        marginTop: 5,
        flexDirection: "column",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "center",
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


