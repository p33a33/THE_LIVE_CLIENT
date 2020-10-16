import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input, Card } from 'react-native-elements'

export default class Mypage extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>it's Mypage Page</Text>
                <Card containerStyle={{ width: "90%" }}>
                    <Card.Title> [닉네임]님이 지금까지 구매한 상품은 </Card.Title>
                    <Card.Divider />
                    <Text style={{ textAlign: "right", fontSize: 20, fontWeight: "bold" }}>총 72가지, 9,549,600원 입니다</Text>
                    <Text style={{ textAlign: "right" }}> 전체유저 중 구매총액으로 상위 4%시네요!</Text>
                    <Text style={{ textAlign: "right" }}> 가장 많이 구매하신 품목은 [옷]이에요</Text>
                    <Text style={{ textAlign: "right", fontWeight: "bold" }}>클릭해서 구매내역 보기</Text>
                </Card>
                <Card containerStyle={{ width: "90%" }}>
                    <Card.Title > [닉네임]님이 팔로우중인 Seller는 </Card.Title>
                    <Card.Divider />
                    <Text style={{ textAlign: "right", fontSize: 20, fontWeight: "bold" }}>15명 입니다</Text>
                    <Text style={{ textAlign: "right", fontWeight: "bold" }}>클릭해서 팔로우중인 Seller 확인하기</Text>
                </Card>
            </View>
        )
    }
}

