import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Image } from 'react-native-elements'



export default class SearchDefaultEntry extends React.Component {
    constructor(props) {
        super(props)
        this.ConvertSystemSourcetoHtml = this.ConvertSystemSourcetoHtml.bind(this)
    }
    ConvertSystemSourcetoHtml(str) {
        str = str.replace("&lt;", "<");
        str = str.replace("&gt;", ">");
        str = str.replace("&quot;", '"');
        str = str.replace("&#39;", "'");
        return str;
    }
    render() {
        let imgSrc = this.props.itm.snippet.thumbnails.default.url
        return (
            <View style={styles.listItems}>
                <View >
                    <Image
                        style={{ height: 130, width: 130, borderRadius: 20 }}
                        source={{ uri: imgSrc }}
                        onPress={() => this.props.navigation.navigate('Watching')}
                    />
                    <Text onPress={() => this.props.navigation.navigate('Watching')} >
                        {this.ConvertSystemSourcetoHtml(this.props.itm.snippet.title)}
                    </Text>
                </View>
            </View >
        )

    }
}

const styles = StyleSheet.create({
    listItems: {
        padding: 5,
        width: "50%",
    },
});
