import React from 'react'
import { View, ScrollView, StyleSheet, ListView } from 'react-native'
import { Text, Button, Image, SearchBar, Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import { BoxShadow } from 'react-native-shadow'
import { YOUTUBE_API_KEY } from '../../../config'
import { searchYouTube } from '../../searchYouTube';


export default class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: [],
            search: ""
        }
        this.ConvertSystemSourcetoHtml = this.ConvertSystemSourcetoHtml.bind(this)
        this.fetchData = this.fetchData.bind(this)
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
            query: this.props.route.params.search,
            max: 6,
            key: YOUTUBE_API_KEY
        }
        searchYouTube(initOption, (data) => this.setState({ result: data }))
    }
    componentDidMount() {
        this.fetchData()
    }
    async handleChangeText(text) {
        await this.setState({ search: text })
        await searchYouTube({ query: this.state.search, max: 12, key: YOUTUBE_API_KEY }, (data) => this.setState({ result: data }))
    }
    renderItem({ item }) {
        let imgSrc = item.snippet.thumbnails.default.url
        return (
            <View style={styles.listItems} >
                <BoxShadow setting={shadowOpt}>
                    <Image
                        style={{ height: 130, width: 130, borderRadius: 20 }}
                        source={{ uri: imgSrc }}
                        onPress={() => this.props.navigation.navigate('Watching')}
                    />
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.listText}
                        onPress={() => this.props.navigation.navigate('Watching')} >
                        {this.ConvertSystemSourcetoHtml(item.snippet.title.toUpperCase())}
                    </Text>
                </BoxShadow>
            </View >
        )
    }
    render() {

        return (
            <ScrollView style={styles.body}>
                <SearchBar
                    onChangeText={this.handleChangeText.bind(this)}
                    lightTheme={true}
                    round={true}
                    placeholder="검색어를 입력하세요"
                    value={this.state.search}
                    containerStyle={{
                        height: 42,
                        padding: 5,
                        marginBottom: 5,
                    }}
                    inputContainerStyle={{
                        height: "20%",
                        backgroundColor: "white",
                        padding: 10,
                        marginBottom: 5
                    }}
                    inputStyle={{
                        padding: 2
                    }}
                />
                {this.props.route.params.target === "live" ?
                    <>
                        <Text style={styles.title}>검색 결과 : 방송</Text>
                        <View style={styles.container}>
                            {this.state.result.map((itm) =>
                                <FlatList
                                    data={this.state.result}
                                    onEndReached={this.fetchData}
                                    renderItem={this.renderItem.bind(this)}
                                    navigation={this.props.navigation}
                                />)}
                        </View>
                    </>
                    :
                    <>
                        <Text style={styles.title}>검색 결과 : 제품</Text>
                        <View style={styles.container}>
                            {this.state.result.map((itm) =>
                                <FlatList
                                    renderItem={this.renderItem.bind(this)}
                                    onEndReached={this.fetchData}
                                    data={this.state.result}
                                    navigation={this.props.navigation}
                                />)}
                        </View>
                    </>
                }
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    body: {
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 5,

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
        marginBottom: 70
    },
    listItems: {
        marginBottom: 33,
        padding: 10,
        width: "50%",
    },
    listText: {
        width: 120,
        marginTop: 5,
        marginBottom: 10,
        padding: 5,
        textAlign: "center",
        alignSelf: "center",
        fontWeight: "bold"
    }
});


const shadowOpt = {
    width: 130,
    height: 130,
    color: "#000",
    border: 8,
    radius: 15,
    opacity: 0.2,
    x: 0,
    y: 3,
    style: { marginVertical: 5 }
}