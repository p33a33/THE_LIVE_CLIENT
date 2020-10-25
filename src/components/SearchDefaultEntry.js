import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Image } from 'react-native-elements'
import { BoxShadow } from 'react-native-shadow'


export default class SearchDefaultEntry extends React.Component {
    constructor(props) {
        super(props)
        this.ConvertSystemSourcetoHtml = this.ConvertSystemSourcetoHtml.bind(this)
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
    render() {
        let imgSrc = this.props.itm.snippet.thumbnails.default.url
        return (
            <View style={styles.listItems} >
                <BoxShadow setting={shadowOpt}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 20 }}
                        source={{ uri: imgSrc }}
                        onPress={() => this.props.navigation.navigate('Watching')}
                    />
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.listText}
                        onPress={() => this.props.navigation.navigate('Watching')} >
                        {this.ConvertSystemSourcetoHtml(this.props.itm.snippet.title.toUpperCase())}
                    </Text>
                </BoxShadow>
            </View >
        )

    }
}

const shadowOpt = {
    width: 100,
    height: 100,
    color: "#000",
    border: 8,
    radius: 15,
    opacity: 0.2,
    x: 0,
    y: 3,
    style: { marginVertical: 5 }
}
const styles = StyleSheet.create({
    listItems: {
        marginBottom: 10,
        paddingBottom: 30,
        paddingLeft: 10,
        width: "50%",
    },
    listText: {
        width: 120,
        marginTop: 5,
        padding: 5,
        textAlign: "center",
        alignSelf: "center",
        fontWeight: "bold"
    }
});
