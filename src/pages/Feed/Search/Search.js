import React from 'react'
import { View, ScrollView, StyleSheet, ListView } from 'react-native'
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
            search: ""
        }
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
        await this.setState({ search: text })
        // await searchYouTube({ query: this.state.search, max: 12, key: YOUTUBE_API_KEY }, (data) => this.setState({ popularVids: data }))
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
                {this.state.search === "" ?
                    <Text style={styles.title}>현재 인기있는 방송</Text> : <Text style={styles.title}>검색 결과</Text>}
                <View style={styles.container}>
                    {this.state.popularVids.map((itm) => <SearchDefaultEntry itm={itm} key={itm.etag} navigation={this.props.navigation} />)}
                </View>
                {this.state.search === "" ?
                    <>
                        <Text style={styles.title}>현재 인기있는 제품</Text>
                        <View style={styles.container}>
                            {this.state.popularItms.map((itm) => <SearchDefaultEntry itm={itm} key={itm.etag} navigation={this.props.navigation} />)}
                        </View>
                    </>
                    : null}
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

});

