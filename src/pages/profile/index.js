import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'

import { getUserInfo } from '../../utils/wechat'

import qrcodesgPng from '../../assets/images/qrcode-sg.png'

class Profile extends Component {
  state = {
    // title: '关于',
    userInfo: {
      wechat: 'SG',
      nickName: 'https://github.com/mini-mpvue/mpvue-douban',
      avatarUrl: qrcodesgPng
    }
  }

  getUserInfo = async () => {
    const data = await getUserInfo()
    this.setState({
      userInfo: data.userInfo
    })
  }

  render () {
    const userInfo = this.state.userInfo

    return (
      <View className='md-profile'>
        <Button open-type='getUserInfo'>授权访问</Button>
        <View className='md-profile__user' onClick={this.getUserInfo}>
          <Image className='md-profile__user-avatar' src={userInfo.avatarUrl} mode='aspectFit' />
          <Text className='md-profile__user-nickname'>{ userInfo.nickName }</Text>
          <Text hidden={!userInfo.city}> { userInfo.city }, { userInfo.province }</Text>
          <Text hidden={!userInfo.city}> Thanks~ </Text>
        </View>
      </View>
    )
  }
}

export default Profile
