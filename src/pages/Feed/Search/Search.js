import React from 'react'
import { View, ScrollView, StyleSheet, ListView, FlatList } from 'react-native'
import { Text, Button, Image, SearchBar, Icon } from 'react-native-elements'
import { min } from 'react-native-reanimated';
import SearchDefaultEntry from '../../../components/SearchDefaultEntry';
import { YOUTUBE_API_KEY } from '../../config'
import { searchYouTube } from '../searchYouTube';


export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popularVids: [],
            popularItms: [],
            search: "",
            result: null
        }
        this.resultHandler = this.resultHandler.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
        this._renderItem = this._renderItem.bind(this)
    }
    componentDidMount() {
        let initOption = {
            query: 'storror',
            max: 6,
            key: YOUTUBE_API_KEY
        }
        let rdmOption = {
            query: 'boiler+room',
            max: 6,
            key: YOUTUBE_API_KEY
        }
        Promise.all([searchYouTube(rdmOption, (data) => this.setState({ popularVids: data })), searchYouTube(initOption, (data) => this.setState({ popularItms: data }))])
    }
    async handleChangeText(text) {
        await this.setState({ search: text, result: null })
        await searchYouTube({ query: this.state.search, max: 12, key: YOUTUBE_API_KEY }, (data) => this.setState({ popularVids: data }))
        await searchYouTube({ query: this.state.search, max: 12, key: YOUTUBE_API_KEY }, (data) => this.setState({ popularItms: data }))
    }
    resultHandler(target) {
        this.setState({ result: target })
    }
    _renderItem({ item }) {
        return (<SearchDefaultEntry
            itm={item}
            navigation={this.props.navigation}
        />)
    }
    render() {
        let searchOpt = {
            query: this.state.search,
            max: 6,
            key: YOUTUBE_API_KEY
        }
        return (
            <View style={styles.body} >
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
                <ScrollView style={{ overflow: "scroll", height: "100%" }}>
                    <View style={styles.container} >
                        {this.state.search === "" ?
                            <>
                                <Text style={styles.title}>현재 인기있는 방송</Text>
                                <View >
                                    <ScrollView style={styles.scrollList} horizontal={true} >
                                        {this.state.popularVids.map((itm) => <SearchDefaultEntry itm={itm} navigation={this.props.navigation} />)}
                                    </ScrollView>
                                </View>
                            </>
                            : (this.state.result === 'live' ?
                                <View>
                                    <Text style={styles.title}>검색 결과 : 방송</Text>
                                    <FlatList
                                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                                        numColumns={2}
                                        data={this.state.popularVids}
                                        keyExtractor={(item) => item.etag.toString()}
                                        renderItem={this._renderItem}
                                        onEndReached={() => { searchYouTube(searchOpt, (data) => this.setState({ popularVids: this.state.popularVids.concat(data) })) }}
                                    />
                                    {/*this.state.popularVids.map((itm) => <SearchDefaultEntry itm={itm} key={itm.etag} navigation={this.props.navigation} />)*/}
                                </View>
                                : (this.state.result === 'item' ? <></> :
                                    <>
                                        <Text style={styles.title} onPress={() => { this.resultHandler("live"); }}>검색 결과 : 방송</Text>
                                        <View >
                                            <ScrollView style={styles.scrollList} horizontal={true} >
                                                {this.state.popularVids.map((itm) => <SearchDefaultEntry itm={itm} navigation={this.props.navigation} />)}
                                            </ScrollView>
                                        </View>
                                    </>))}
                    </View>
                    <View style={styles.container}>
                        {this.state.search === "" ?
                            <>
                                <Text style={styles.title}>현재 인기있는 제품</Text>
                                <View >
                                    <ScrollView style={styles.scrollList} horizontal={true}>
                                        {this.state.popularItms.map((itm) => <SearchDefaultEntry itm={itm} key={itm.etag} navigation={this.props.navigation} />)}
                                    </ScrollView>
                                </View>
                            </>
                            : (this.state.result === 'item' ?
                                <View style={styles.resultContainer}>
                                    <Text style={styles.title}>검색 결과 : 제품</Text>
                                    <FlatList
                                        numColumns={2}
                                        data={this.state.popularItms}
                                        keyExtractor={(item) => item.toString()}
                                        renderItem={this._renderItem}
                                        onEndReached={() => { searchYouTube(searchOpt, (data) => this.setState({ popularItms: this.state.popularItms.concat(data) })) }}
                                    />
                                    {/*{this.state.popularItms.map((itm) => <SearchDefaultEntry itm={itm} key={itm.etag} navigation={this.props.navigation} onEndReached />)}*/}
                                </View>
                                : (this.state.result === 'live' ? <></> :
                                    <>
                                        <Text style={styles.title} onPress={() => { this.resultHandler("item"); }}>검색 결과 : 제품</Text>
                                        <View >
                                            <ScrollView style={styles.scrollList} horizontal={true}>
                                                {this.state.popularItms.map((itm) =>
                                                    <SearchDefaultEntry
                                                        itm={itm} key={itm.etag} navigation={this.props.navigation} />)}
                                            </ScrollView>
                                        </View>
                                    </>
                                ))}
                    </View>
                </ScrollView>
            </View >
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
        padding: 2,
    },
    container: {
        paddingBottom: 10,
        marginBottom: 10,
        backgroundColor: "#f2f2f2",
    },
    scrollList: {
        flexDirection: "column",
        flexWrap: "wrap",
        flexGrow: 1,
        alignContent: "space-around",
        margin: 5,
        paddingBottom: 10
    },
    resultContainer: {
        justifyContent: "space-around",
        marginTop: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "flex-start",
        backgroundColor: "#f2f2f2",
        marginBottom: 70
    }
});


