import React, { Children } from 'react'
import { View, Modal } from 'react-native'
import { Text, Button, Input, Image, ListItem, ButtonGroup } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { SERVER } from '../pages/config'
import Axios from 'axios'

export default class MyItemListEntry extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productInfo: this.props.productInfo
        }
    }

    render() {
        let { id, price, title, quantity, image } = this.state.productInfo
        let { handleDelete } = this.props
        return (
            <TouchableOpacity onPress={() => console.log('go to detail')}>
                <View style={{
                    width: `${100}%`,
                    flexDirection: "row",
                    marginBottom: `${3}%`,
                    padding: 10,
                    marginBottom: 20,
                    paddingLeft: 30,
                    borderRadius: 30, backgroundColor: 'whitesmoke', elevation: 8,
                }}>
                    {image ? <Image source={{ uri: `${SERVER + image}` }} style={{ width: 70, height: 70, marginRight: `${5}%`, borderRadius: 5 }} />
                        : <View style={{ width: 70, height: 70, marginRight: `${5}%`, backgroundColor: 'rgba(200, 200, 200, 1)', borderRadius: 5 }} />}
                    <View style={{ alignSelf: "center", width: `${45}%` }}>
                        <Text style={{ textAlign: "right" }}>{title}</Text>
                        <Text style={{ textAlign: "right" }}>Price : {price}</Text>
                        <Text style={{ textAlign: "right" }}>Available : {quantity}</Text>
                    </View>
                    <View style={{ marginLeft: `${10}%`, marginTop: `${5}%` }}>
                        <Button title="Del" onPress={() => handleDelete(id)} buttonStyle={{ backgroundColor: 'slateblue' }} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
