import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WatchingIndex from './Watching/Index'
import SearchIndex from './Search/Index'
import MypageIndex from './Mypage/Index'
import StreamingIndex from '../Streaming/Index';
import ProductListIndex from './ProductList/Index';
import Axios from 'axios';
import { SERVER } from '../config';

const Tab = createBottomTabNavigator();
export default class FeedIndex extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSeller: false,
            visible: true
        }
        this.handleSellerState = this.handleSellerState.bind(this)
        this.handleVisible = this.handleVisible.bind(this)
    }

    componentDidMount() {
        Axios.get(`${SERVER}/userInfo`)
            .then(data => {
                let { is_seller } = data.data
                if (is_seller) {
                    this.setState({ isSeller: true })
                }
            })
    }

    handleSellerState = (boolean) => {
        this.setState({ isSeller: boolean })
    }

    handleVisible = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        let { isSeller } = this.state
        return (
            <Tab.Navigator >
                <Tab.Screen name="Feed" component={WatchingIndex} />
                <Tab.Screen name="ProductList" component={ProductListIndex} options={{ tabBarVisible: this.state.visible }} initialParams={{ handleVisible: this.handleVisible }} />
                { isSeller && <Tab.Screen name="Streaming" component={StreamingIndex} options={{ tabBarVisible: false }} />}
                <Tab.Screen name="Search" component={SearchIndex} />
                <Tab.Screen name="Mypage" children={() => <MypageIndex handleSellerState={this.handleSellerState} />} />
            </Tab.Navigator>
        )
    }
}
