import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { BorderlessButton, FlatList, RawButton } from 'react-native-gesture-handler'
import SellerInfoHome from '../../components/SellerInfoHome'
import SellerItemEntry from '../../components/SellerItemEntry'
import { HeaderBackButton } from '@react-navigation/stack';
import SearchDefaultEntry from '../../components/SearchDefaultEntry'


export default class SellerHome extends React.Component {
    constructor(props) {
        super(props)
        this._renderItem = this._renderItem.bind(this)
    }
    _renderItem({ item }) {
        return (
            <View style={{ margin: 8, }}>
                <SellerItemEntry itm={item} navigation={this.props.navigation} />
            </View>
        )
    }
    render() {
        return (

            <ScrollView>
                <HeaderBackButton onPress={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={styles.sellerContainer}>
                    <Text style={styles.sellerTitle}>{this.props.route.params.list[0].name.toUpperCase()}</Text>
                    <SellerInfoHome navigation={this.props.navigation} />
                    <Button type="outline" title="Follow"></Button>
                    <Text style={styles.sellerTitle}>{"Streaming".toUpperCase()}</Text>
                    <View style={styles.sellerItm}>
                        {this.props.route.params.list.map((itm) => <SearchDefaultEntry itm={itm} navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('Watching')} />)}
                    </View>
                    <Text style={styles.sellerTitle}>{"Products".toUpperCase()}</Text>
                    <View style={{ alignItems: "center" }}>
                        <FlatList
                            data={this.props.route.params.list}
                            renderItem={this._renderItem}
                            numColumns={2}
                        />
                    </View>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    sellerContainer: {
        marginLeft: 7,
        marginRight: 7,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
    },
    sellerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 5,
        marginLeft: 10
    },
    sellerItm: {
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "flex-start",
        paddingBottom: 30
    }
})