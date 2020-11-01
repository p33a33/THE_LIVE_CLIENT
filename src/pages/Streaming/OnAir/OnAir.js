import React from 'react';
import { View, Dimensions, PermissionsAndroid, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';
import { NodeCameraView } from 'react-native-nodemediaclient';
import ChatInput from '../../../components/ChatInput';
import { RTMP_SERVER } from '../../config'
import FloatingHearts from '../../../components/floatingHeart/FloatingHearts'
import StreamingItems from '../../../components/StreamingItems';
import SocketManager from '../../../socketManager'
import { Socket } from 'socket.io-client';
import { HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class OnAir extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            liveStatus: false,
            messages: [],
            chatInput: null,
            count: 0,
            title: this.props.route.params.title,
            userInfo: this.props.route.params.userInfo,
        }
        this.setCameraRef = this.setCameraRef.bind(this)
        this.handleLiveStatus = this.handleLiveStatus.bind(this)
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleSendChat = this.handleSendChat.bind(this)
        this.handlePressHeart = this.handlePressHeart.bind(this)
        this.list = [
            {
                name: "ANYA HINDMARCH", id: "1", email: "seller5@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1337372_1_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/outfit_1337372_1_zoom.jpg', "https://assetsprx.matchesfashion.com/img/product/1337372_4_zoom.jpg"], title: "츄잉 검 캔들",
                body: "그린 글라스 용기에 브랜드 시그니처인 아이 아플리케를 장식하고 왁스를 손으로 부어 영국에서 제작했습니다. 디자이너의 학창 시절을 떠올리며 영감을 얻은 민트와 핑크 페퍼, 타임, 카시스 펄프 등이 어우러진 향이 특징입니다. 따사로운 햇볕이 느껴지는 여유로운 오후에 향을 피워 어릴 적 소중한 순간을 추억해보세요.", price: "₩ 5,000"
            },
            { name: "& Other Stories", id: "2", email: "seller1@test.com", image: ["https://image.thehyundai.com/static/8/6/8/18/A1/hnm40A1188689_0901685003_202002_LB_0661_Q8_L_1120x868_srgb_848.jpg", "https://image.thehyundai.com/static/8/6/8/18/A1/hnm40A1188689_02_0901685_003_001_848.jpg"], title: "크롭 버튼 업 니트 스웨터", body: "크롭 실루엣의 롱 슬리브 스웨터예요. 케이블 니트 룩과 메인 패브릭 소재로 감싼 단추가 특징이랍니다.", price: "₩ 860,000" },
            {
                name: "Cartier", id: "3", email: "seller2@test.com", image: ['https://cdn2.chrono24.com/images/uhren/16000731-5d7hntuyfucwgmqbuxikbm3u-Zoom.jpg', "https://cdn2.chrono24.com/images/uhren/16000731-w99felxi7r8kz35j2rgbiomy-Zoom.jpg", "https://cdn2.chrono24.com/images/uhren/16000731-nwj6pphl2uxobwbrqm15doii-Zoom.jpg"], title: "크래쉬 워치",
                body: "1967년 '스윙잉 런던(Swinging London)'의 한복판에서 탄생한 크래쉬 워치는 당대의 역동적이고 자유로운 분위기를 반영하고 있으며, 새로운 형태를 창조하는 워치메이커 까르띠에와 순응주의를 거부하는 반항적이면서도 유쾌한 팝 정신이 만나 탄생한 모델입니다.", price: "₩ 5,100,000"
            },
            {
                name: "Bottega Veneta", id: "4", email: "seller3@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1381554_1_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/1381554_5_zoom.jpg', "https://assetsprx.matchesfashion.com/img/product/1381554_6_zoom.jpg"], title: "스트레치 스퀘어 토 가죽 뮬",
                body: "스퀘어 토 실루엣으로 보테가 베네타(Bottega Veneta)를 이끄는 다니엘 리(Daniel Lee) 고유의 디자인 미학을 담아낸 크림 색상 스트레치 뮬을 만나보세요. 부드러운 가죽으로 넓은 앞면 스트랩을 구성하고 가느다란 스틸레토 힐을 세팅한 이탈리아 제작 상품이며 안정적인 착화감을 위해 밑창에 고무 그립을 더했습니다. 테일러드 룩에 우아한 포인트 아이템으로 매치해보세요.", price: "₩ 150,000"
            },
            {
                name: "Bottega Veneta", id: "5", email: "seller4@test.com", image: ["https://assetsprx.matchesfashion.com/img/product/1360764_1_zoom.jpg", "https://assetsprx.matchesfashion.com/img/product/1360764_3_zoom.jpg", 'https://assetsprx.matchesfashion.com/img/product/outfit_1360764_1_zoom.jpg'], title: "더 숄더 파우치 라지 가죽 백",
                body: "볼륨감 있는 모던한 실루엣이 돋보이는 보테가 베네타(Bottega Veneta)의 탠 브라운 더 숄더 파우치 백을 살펴보세요. 이탈리아에서 부드러운 가죽으로 제작했으며, 넉넉한 내부 공간의 중앙 부분에서 시작되는 주름 장식과 로고 디테일이 브랜드 고유의 디자인을 완성합니다 뉴트럴 톤으로 스타일링한 룩에 들어 군더더기 없이 담백한 감성을 표현해보세요.", price: "₩ 60,000"
            },
            {
                name: "& Other Stories", id: "6", email: "seller5@test.com", image: ["https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_01_0948433_001_001_848.jpg", 'https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_01_0948433_001_003_848.jpg', "https://image.thehyundai.com/static/3/1/7/20/A1/hnm40A1207139_02_0948433_001_001_848.jpg"], title: "릴렉스드 퍼지 버블 니트 스웨터",
                body: "롱 슬리브의 니트 스웨터예요. 릴렉스드 버블 실루엣, 그리고 솜털 같은 텍스처가 특징이에요.", price: "₩ 5,000"
            },
        ]
    }

    componentDidMount() {
        let { title } = this.state
        let { nickname } = this.state.userInfo
        console.log(this.props)

        this.requestCameraPermission();
        this.props.route.params.handleVisible();

        SocketManager.instance.emitJoinRoom({ nickName: nickname, title })
        SocketManager.instance.listenSendChat(this.handleIncomingChat)
        SocketManager.instance.listenSendHeart(this.handleIncomingHeart)
    }

    componentWillUnmount() {
        let { title } = this.state
        let { nickname } = this.state.userInfo
        this.props.route.params.handleVisible();
        this.nodeCameraViewRef.stop()
        SocketManager.instance.emitLeaveRoom({ nickName: nickname, title })
    }

    handleLiveStatus = () => {
        if (!this.state.liveStatus) {
            this.nodeCameraViewRef.start()
            this.setState({ liveStatus: true })
        } else {
            this.nodeCameraViewRef.stop()
            this.setState({ liveStatus: false })
        }
        this.setState({ liveStatus: !this.state.liveStatus })
    }

    handleInputValue = (e) => {
        this.setState({ chatInput: e })
    }

    handlePressHeart = () => {
        SocketManager.instance.emitSendHeart({ title: this.state.title });
    }

    handleSendChat = () => {
        let { chatInput, title } = this.state
        let { nickname } = this.state.userInfo
        let message = { nickName: nickname, title: title, message: chatInput }
        SocketManager.instance.emitSendChat(message);
    }

    handleIncomingChat = (message) => {
        let temp = this.state.messages
        temp.push(message)
        this.setState({ messages: temp })
        console.log(this.state.messages)
    }

    handleIncomingHeart = () => {
        this.setState({ count: this.state.count + 1 })
    }

    handleGoback = () => {
        if (this.state.liveStatus) {
            alert("방송중에는 뒤로 갈 수 없습니다.")
        } else {
            this.props.navigation.goBack();
        }
    }

    handleSwitchCamera = () => {
        this.nodeCameraViewRef.switchCamera();
    }
    handleGoback = () => {
        this.props.navigation.goBack();
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO], {
                title: '카메라 권한 허용',
                message: '스트리밍을 위해서는 카메라 권한이 필요합니다.',
                buttonNeutral: 'Ask me Later',
                buttonNegative: 'cancle',
                buttonPositive: 'OK'
            }
            );
            let cameraPermission = granted['android.permission.CAMERA']
            let auidoPermission = granted['android.permission.RECORD_AUDIO']
            if (cameraPermission === 'granted' && auidoPermission === 'granted') {
                console.log("You can use the camera&audio");
                this.nodeCameraViewRef.startPreview();
            } else {
                console.log("Permisson denied")
            }
        } catch (err) {
            console.warn(err);
        }
    };

    setCameraRef = (ref) => {
        this.nodeCameraViewRef = ref;
    };

    render() {
        let userName = 'test'
        let { liveStatus, count, messages } = this.state
        let deviceHeight = Dimensions.get('window').height - StatusBar.currentHeight
        let deviceWidth = Dimensions.get('window').width
        let outputURL = `${RTMP_SERVER}/live/${userName}` // 영상을 전송받을 URL을 정의

        return (
            <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
                <View style={{ flex: 1 }}>
                    <NodeCameraView
                        style={{ position: 'absolute', top: 0, left: 0, height: deviceHeight, width: deviceWidth }}
                        ref={this.setCameraRef}
                        outputUrl={outputURL} // URL이 확정되면 해당 URL로 영상을 전송
                        camera={{ cameraId: 1, cameraFrontMirror: false }}
                        audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                        video={{ preset: 1, bitrate: 400000, profile: 0, fps: 30, videoFrontMirror: false }}
                        autopreview={true}
                    />
                    <View style={{ marginBottom: -10, flexDirection: "row", borderColor: "yellow", borderWidth: 2 }}>
                        <HeaderBackButton
                            onPress={this.handleGoback}
                            tintColor="slategrey"
                            style={{ padding: 10, }}
                        />
                        <View style={{ paddingLeft: "20%", flexDirection: "row", borderColor: "blue", borderWidth: 2 }}>
                            <Icon.Button
                                name="camera"
                                onPress={this.handleSwitchCamera}
                                borderRadius={15}
                                size={30}
                                // style={{ justifyContent: "center", backgroundColor: 'slateblue', width: 60, height: 35, alignSelf: "center" }}
                                backgroundColor={`rgba(0, 0, 0, 0)`}
                            >
                                {/* <Text style={{ color: "white", fontFamily: "sans-serif-thin", fontSize: 13 }}>카메라 전환</Text> */}
                            </Icon.Button>
                            <Icon.Button
                                onPress={this.handleLiveStatus}
                                name={liveStatus ? 'stop' : 'play'}
                                borderRadius={15}
                                size={30}
                                // style={{ justifyContent: "center", backgroundColor: 'slateblue', width: 30, height: 35, alignSelf: "center" }}
                                backgroundColor={`rgba(0, 0, 0, 0)`}
                            >
                                {/* <Text style={{ color: "white", fontFamily: "sans-serif-thin", fontSize: 13 }}>{liveStatus ? '방송 종료' : '방송 시작'}</Text> */}
                            </Icon.Button>
                        </View>
                    </View>
                </View>
                <View style={{ zIndex: 1, borderColor: "green", borderWidth: 2, height: 300 }} >
                    <ChatInput
                        handleInputValue={this.handleInputValue}
                        handleSendChat={this.handleSendChat}
                        handlePressHeart={this.handlePressHeart}
                        messages={messages}
                    />
                </View>
                <FloatingHearts count={count} />
            </SafeAreaView >
        )
    }
}

