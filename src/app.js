import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/board/index',
      'pages/search/index',
      'pages/profile/index'
    ],
    window: {
      backgroundColor: '#f8f9fb',
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#40586d',
      navigationBarTitleText: '电影 « 豆瓣',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: false
    },
    tabBar: {
      color: '#666666',
      selectedColor: '#000000',
      borderStyle: 'white',
      backgroundColor: '#f8f9fb',
      list: [
        {
          text: '榜单',
          pagePath: 'pages/board/index',
          iconPath: 'static/images/board.png',
          selectedIconPath: 'static/images/board-actived.png'
        },
        {
          text: '搜索',
          pagePath: 'pages/search/index',
          iconPath: 'static/images/search.png',
          selectedIconPath: 'static/images/search-actived.png'
        },
        {
          text: '我的',
          pagePath: 'pages/profile/index',
          iconPath: 'static/images/profile.png',
          selectedIconPath: 'static/images/profile-actived.png'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
