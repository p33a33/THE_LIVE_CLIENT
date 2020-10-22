import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Image } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';



export default class SellerItemEntry extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let { navigation } = this.props
        let { navigate } = navigation
        let { itm } = this.props
        let imgSrc = itm.image[0]
        return (
            <LinearGradient colors={{ useAngle: true, angle: 45 }, ['#FFFFFF', '#EEE5E2']} key={itm.title} style={{
                borderRadius: 20, padding: 3, marginBottom: 10, alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
            }} >
                <Image
                    style={{ height: 140, width: 140, marginTop: 5, borderRadius: 20 }}
                    source={{ uri: imgSrc }}
                    onPress={() => {
                        navigate('ProductDetail', { info: itm });
                    }}
                ></Image>
                <Text style={{ textAlign: "center", padding: 3, marginTop: 5, marginBottom: 5, width: 150, fontWeight: "bold" }} numberOfLines={1} ellipsizeMode="tail"
                    onPress={() => navigate('ProductDetail', { info: itm })} >
                    {itm.title}
                </Text>
                <Text style={{ textAlign: "center", padding: 3, width: 130 }} numberOfLines={1} ellipsizeMode="tail">
                    {itm.price}
                </Text>
            </LinearGradient>
        )
    }
}
