import React from 'react'
import { View, Text, Image } from 'react-native'
import { or } from 'react-native-reanimated'

export default class SellerOrderList extends React.Component {
    constructor(props) {
        super(props)

        this.list = [
            {
                id: 1,
                status: '결제완료',
                quantity: '3',
                product: {
                    name: "Bottega Veneta",
                    id: "4", email: "seller3@test.com",
                    image: ["https://assetsprx.matchesfashion.com/img/product/1381554_1_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/1381554_5_zoom.jpg', "https://assetsprx.matchesfashion.com/img/product/1381554_6_zoom.jpg"],
                    title: "스트레치 스퀘어 토 가죽 뮬",
                    body: "스퀘어 토 실루엣으로 보테가 베네타(Bottega Veneta)를 이끄는 다니엘 리(Daniel Lee) 고유의 디자인 미학을 담아낸 크림 색상 스트레치 뮬을 만나보세요. 부드러운 가죽으로 넓은 앞면 스트랩을 구성하고 가느다란 스틸레토 힐을 세팅한 이탈리아 제작 상품이며 안정적인 착화감을 위해 밑창에 고무 그립을 더했습니다. 테일러드 룩에 우아한 포인트 아이템으로 매치해보세요.",
                    price: "₩ 150,000"
                }
            }
        ]
    }

    render() {
        return (
            <View>
                <Text> Seller Order List page </Text>
                { this.list.map(order => {
                    return (
                        <View>
                            <Text>주문번호 : {order.id}</Text>
                            <Text>처리상태 : {order.status}</Text>
                            <Text>주문수량 : {order.quantity}</Text>
                            <Image source={{ uri: order.product.image[1] }} style={{ width: 100, height: 100 }} />
                            <Text onPress={() => this.props.navigation.navigate('ProductDetail', { info: order.product })}>상품명 : {order.product.title}</Text>
                        </View>
                    )
                })}
                <Text> 주문번호(orders_id)
                주문처리상태(orders_status)
                주문수량(orders_quantity)
                제품(사우진띄고, 제목만, 클릭 시 상세페이지)
                    </Text>
            </View>
        )
    }
}