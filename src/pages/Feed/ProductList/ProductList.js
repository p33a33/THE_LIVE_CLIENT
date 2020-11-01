import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Text, Button, Input, Header } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { CustomHeader } from '../../../components/CustomHeader'
import ProductListEntry from '../../../components/ProductListEntry'

export default class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }

    list = [
        {
            name: "ANYA HINDMARCH", id: "1", email: "seller5@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1337372_1_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/outfit_1337372_1_zoom.jpg', "https://assetsprx.matchesfashion.com/img/product/1337372_4_zoom.jpg"], title: "츄잉 검 캔들",
            body: "<Div>그린 글라스 용기에 브랜드 시그니처인 아이 아플리케를 장식하고 왁스를 손으로 부어 영국에서 제작했습니다. 디자이너의 학창 시절을 떠올리며 영감을 얻은 민트와 핑크 페퍼, 타임, 카시스 펄프 등이 어우러진 향이 특징입니다. 따사로운 햇볕이 느껴지는 여유로운 오후에 향을 피워 어릴 적 소중한 순간을 추억해보세요.</Div>", price: "5,000"
        },
        { name: "& Other Stories", id: "2", email: "seller1@test.com", image: ["https://image.thehyundai.com/static/8/6/8/18/A1/hnm40A1188689_0901685003_202002_LB_0661_Q8_L_1120x868_srgb_848.jpg", "https://image.thehyundai.com/static/8/6/8/18/A1/hnm40A1188689_02_0901685_003_001_848.jpg"], title: "크롭 버튼 업 니트 스웨터", body: "크롭 실루엣의 롱 슬리브 스웨터예요. 케이블 니트 룩과 메인 패브릭 소재로 감싼 단추가 특징이랍니다.", price: "860,000" },
        {
            name: "Cartier", id: "3", email: "seller2@test.com", image: ['https://cdn2.chrono24.com/images/uhren/16000731-5d7hntuyfucwgmqbuxikbm3u-Zoom.jpg', "https://cdn2.chrono24.com/images/uhren/16000731-w99felxi7r8kz35j2rgbiomy-Zoom.jpg", "https://cdn2.chrono24.com/images/uhren/16000731-nwj6pphl2uxobwbrqm15doii-Zoom.jpg"], title: "크래쉬 워치",
            body: "1967년 '스윙잉 런던(Swinging London)'의 한복판에서 탄생한 크래쉬 워치는 당대의 역동적이고 자유로운 분위기를 반영하고 있으며, 새로운 형태를 창조하는 워치메이커 까르띠에와 순응주의를 거부하는 반항적이면서도 유쾌한 팝 정신이 만나 탄생한 모델입니다.", price: "5,100,000"
        },
        {
            name: "Bottega Veneta", id: "4", email: "seller3@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1381554_1_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/1381554_5_zoom.jpg', "https://assetsprx.matchesfashion.com/img/product/1381554_6_zoom.jpg"], title: "스트레치 스퀘어 토 가죽 뮬",
            body: "스퀘어 토 실루엣으로 보테가 베네타(Bottega Veneta)를 이끄는 다니엘 리(Daniel Lee) 고유의 디자인 미학을 담아낸 크림 색상 스트레치 뮬을 만나보세요. 부드러운 가죽으로 넓은 앞면 스트랩을 구성하고 가느다란 스틸레토 힐을 세팅한 이탈리아 제작 상품이며 안정적인 착화감을 위해 밑창에 고무 그립을 더했습니다. 테일러드 룩에 우아한 포인트 아이템으로 매치해보세요.", price: "150,000"
        },
        {
            name: "Bottega Veneta", id: "5", email: "seller4@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1360764_1_zoom.jpg", "https://assetsprx.matchesfashion.com/img/product/1360764_3_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/outfit_1360764_1_zoom.jpg'], title: "더 숄더 파우치 라지 가죽 백",
            body: "볼륨감 있는 모던한 실루엣이 돋보이는 보테가 베네타(Bottega Veneta)의 탠 브라운 더 숄더 파우치 백을 살펴보세요. 이탈리아에서 부드러운 가죽으로 제작했으며, 넉넉한 내부 공간의 중앙 부분에서 시작되는 주름 장식과 로고 디테일이 브랜드 고유의 디자인을 완성합니다 뉴트럴 톤으로 스타일링한 룩에 들어 군더더기 없이 담백한 감성을 표현해보세요.", price: "60,000"
        },
        {
            name: "& Other Stories", id: "6", email: "seller5@test.com", image: ["https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_01_0948433_001_001_848.jpg", 'https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_01_0948433_001_003_848.jpg', "https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_02_0948433_001_001_848.jpg"], title: "릴렉스드 퍼지 버블 니트 스웨터",
            body: "롱 슬리브의 니트 스웨터예요. 릴렉스드 버블 실루엣, 그리고 솜털 같은 텍스처가 특징이에요.", price: "5,000"
        },
    ]

    render() {
        return (
            <>
                <CustomHeader navigation={this.props.navigation} />
                <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1, }}>
                    <ScrollView style={{ padding: 30, paddingTop: -30 }}>
                        <View style={{ marginLeft: 13, padding: 5, }}>
                            <Text style={{
                                fontSize: 20, letterSpacing: 1, fontFamily: 'sans-serif-light', marginTop: 5, color: "slateblue"
                            }}>SHOP</Text>
                            <Text style={{ fontSize: 16, letterSpacing: 1, fontFamily: 'sans-serif-thin', }}>TRENDING</Text>
                        </View>
                        {this.list.map((product, index, array) => <ProductListEntry key={index} list={array} productInfo={product} navigation={this.props.navigation} handleVisible={this.props.route.params.handleVisible} />)}
                    </ScrollView>
                </LinearGradient>
            </>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: 25,
        padding: 5,
        fontFamily: "sans-serif-light",

    },
})
