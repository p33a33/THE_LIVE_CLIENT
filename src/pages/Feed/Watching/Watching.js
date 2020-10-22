import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { NodePlayerView } from 'react-native-nodemediaclient'
import { RTMP_SERVER } from '../../config'

export default class Watching extends React.Component {

    componentWillUnmount() {
        this.NodePlayerView.stop(); // watching 페이지를 나갔음에도 play상태가 유지되는 것을 방지하기 위해, unmount시 player를 멈춥니다.
    }

    render() {
        let userName = 'test'
        let inputUrl = `${RTMP_SERVER}/live/${userName}`
        return (
            <NodePlayerView
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                ref={(vb) => { this.NodePlayerView = vb }}
                inputUrl={inputUrl}
                scaleMode="ScaleAspectFit"
                bufferTime={300}
                maxBufferTime={1000}
                autoplay
            />
        )
    }
}

