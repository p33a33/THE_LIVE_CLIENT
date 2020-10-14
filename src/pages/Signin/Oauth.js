import React from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler';
import Webview from 'react-native-webview'

export default class Oauth extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentURL: this.props.route.params.url }
    }

    handleRedirect = (webViewState) => {
        let { navigation } = this.props
        if (webViewState.url.includes('codestates')) {
            navigation.navigate('FeedIndex')
            this.webview.stopLoading();
        }
    }

    render() {
        return (
            <Webview
                ref={webview => { this.webview = webview }}
                source={{ uri: this.state.currentURL }}
                onNavigationStateChange={this.handleRedirect} />
        )
    }
}