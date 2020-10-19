import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'


export default class SellerInfoHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sellerInfo: [
                { Rate: "8.6" },
                { Products: "193" },
                { Followers: "12.1k" }
            ]
        }
    }
    render() {
        let { navigation } = this.props
        let { navigate } = navigation

        return (
            <>
                <View style={styles.sellerInfoContainer}>
                    {this.state.sellerInfo.map(function (obj) {
                        return (Object.keys(obj).map(function (key) {
                            return (
                                <View>
                                    <Text style={styles.sellerContainerText}>
                                        {key}
                                        {"\n"}
                                        {obj[key]}
                                    </Text>
                                </View>
                            )
                        })
                        )
                    })}
                </View>
                <Button
                    onPress={() => navigate('SellerHome')}
                    title="go to Seller Home"
                />
            </ >
        )
    }
}

const styles = StyleSheet.create({

    sellerInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        textAlign: "auto",
        marginTop: 10,
        marginBottom: 20
    },
    sellerContainerText: {
        textAlign: "center",
        padding: 5,
        fontWeight: "bold"
    },
    sellerItms: {
        justifyContent: "space-evenly",
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "center",
    }
})