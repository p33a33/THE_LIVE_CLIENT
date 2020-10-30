import Axios from 'axios'
import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import MyItemListEntry from '../../../../components/MyItemListEntry'
import { BoxShadow } from 'react-native-shadow';
import { SERVER } from '../../../config'

export default class MyItemList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
        this.getItems = this.getItems.bind(this)
    }

    getItems() {
        Axios.get(`${SERVER}/myitem`)
            .then(data => this.setState({ list: data.data }))
    }

    componentDidMount = () => {
        this.getItems();
    }

    handleDelete = (id) => {
        Axios.post(`${SERVER}/deleteitem`, { productId: id })
            .then(() => {
                this.getItems()
                alert('성공적으로 삭제되었습니다')
            })
    }

    render() {
        let { list } = this.state

        return (
            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']}>
                <View style={{ padding: 20, paddingBottom: 0, height: `${100}%` }}>
                    <Text h4 style={{ letterSpacing: 0.7 }}>My Itemlist</Text>
                    <View style={{ alignItems: "center" }}>
                        <BoxShadow setting={shadowOpt} style={{ alignItems: 'center' }}>
                            <Button title="Add Item" onPress={() => this.props.navigation.navigate('AddItem', { refreshList: this.getItems })} buttonStyle={{ backgroundColor: 'slateblue' }} />
                        </BoxShadow>
                    </View>
                    <ScrollView contentContainerStyle={{ alignContent: "center", marginTop: 20, padding: 10 }}>
                        {list.map((item, index) =>
                            <MyItemListEntry key={index} productInfo={item} navigation={this.props.navigation} handleDelete={this.handleDelete} />)}
                    </ScrollView>
                </View>
            </LinearGradient>
        )
    }
}


const shadowOpt = {
    width: 200,
    height: 38,
    color: "#708090",
    border: 5,
    radius: 10,
    opacity: 0.3,
    x: 0,
    y: 5,
    style: {
        marginTop: 20,
    }
}