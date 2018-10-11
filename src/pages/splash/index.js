import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components';

import { getStorage, setStorage } from '../../utils/wechat'
import { getBoardData } from '../../utils/api'

import './index.scss'

const LAST_SPLASH_DATA = 'LAST_SPLASH_DATA'

class Splash extends Component {
  state = {
    movies: []
  }

  async getCache () {
    try {
      let res = await getStorage(LAST_SPLASH_DATA)
      const { movies, expires } = res.data
      // 有缓存，判断是否过期
      if (movies && expires > Date.now()) {
        return res.data
      }
      // 已经过期
      console.log('uncached')
      return null
    } catch (error) {
      return null
    }
  }

  handleStart () {
    // TODO: 访问历史的问题
    /* eslint-disable */
    wx.switchTab({
      url: '../board/index'
    })
  }

  async getInitData () {
    let cache = await this.getCache()
    if (cache) {
      this.setState({
        movies: cache.movies
      })
      return
    }
    let data = await getBoardData({board: 'coming_soon', page: 1, count: 3})
    this.setState({
      movies: data.subjects
    })
    await setStorage(LAST_SPLASH_DATA, {
      movies: data.subjects,
      expires: Date.now() + 1 * 24 * 60 * 60 * 1000
    })
  }

  componentDidMount () {
    this.getInitData()
  }

  render () {
    return (
      <View className='md-splash'>
        <Swiper className='md-splash__swiper' indicator-dots>
          {
            this.state.movies.map((item, index) => (
              <SwiperItem className='md-splash__item' key={item.id}>
                <Image src={item.images.large} className='md-splash__image' mode='aspectFill' />
                {
                  index === this.state.movies.length - 1 ?
                    <Button className='md-splash__start' onClick={this.handleStart}>立即体验</Button> :
                    null
                }
              </SwiperItem>
            ))
          }
        </Swiper>
      </View>
    )
  }
}

export default Splash
