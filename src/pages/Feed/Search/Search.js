import React from 'react'
import { View, ScrollView, StyleSheet, ListView } from 'react-native'
import { Text, Button, Image, input } from 'react-native-elements'
import { min } from 'react-native-reanimated';
import { YOUTUBE_API_KEY } from '../config/youtube';
import { searchYouTube } from '../searchYouTube';

export default class Search extends React.Component {
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
        searchYouTube(initOption, (data) => this.setState({ popularVids: data }))
    }

    render() {
        return (
            <ScrollView style={styles.body}>
                <Text style={styles.title}>현재 인기있는 방송</Text>
                <View style={styles.container}>
                    {this.state.popularVids.map((vid) => {
                        let imgSrc = vid.snippet.thumbnails.default.url
                        return (
                            <View className="video-list-entry" style={styles.listItems} >
                                <View >
                                    <Image className="media-thumbnail"
                                        style={{ height: 130, width: 130 }}
                                        source={{ uri: imgSrc }}
                                        onPress={() => this.props.navigation.navigate('Watching')}
                                    />
                                    <View className="media-body" >
                                        <Text className="video-list-entry-title" onPress={() => this.props.navigation.navigate('Watching')} >
                                            {vid.snippet.title}
                                        </Text>
                                    </View>
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
    body: {
        padding: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    container: {
        justifyContent: "space-around",
        marginTop: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "flex-start",
        backgroundColor: "#f2f2f2",
    },
    listItems: {
        padding: 10,
        width: "50%",
    },
});

