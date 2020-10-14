import React from 'react';
import { View, Dimensions, PermissionsAndroid, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { NodeCameraView } from 'react-native-nodemediaclient';
import { RTMP_SERVER } from '../../config'

export default class OnAir extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            liveStatus: false
        }
        this.setCameraRef = this.setCameraRef.bind(this)
    }


    componentDidMount() {
        this.requestCameraPermission();
    }

    handleLiveStatus = () => {
        if (this.state.liveStatus) {
            this.nodeCameraViewRef.start()
        } else {
            this.nodeCameraViewRef.stop()
        }
        this.setState({ liveStatus: !this.state.liveStatus })
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
        let { liveStatus } = this.state
        let deviceHeight = Dimensions.get('window').height
        let deviceWidth = Dimensions.get('window').width
        let outputURL = `${RTMP_SERVER}/live/${userName}` // 영상을 전송받을 URL을 정의

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <NodeCameraView
                    style={{ position: 'absolute', top: 0, left: 0, height: deviceHeight, width: deviceWidth }}
                    ref={this.setCameraRef}
                    output={outputURL} // URL이 확정되면 해당 URL로 영상을 전송
                    camera={{ cameraId: 1, cameraFrontMirror: true }}
                    audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                    video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
                    autopreview={true}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <View >
                        <Button
                            title={liveStatus ? '방송 종료' : '방송 시작'}
                            onPress={this.handleLiveStatus}
                            style={{
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 30,
                                paddingVertical: 5
                            }} />
                    </View>
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

