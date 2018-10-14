import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Block, ScrollView, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getBoards } from '../../actions/board'

import './index.scss'
import arrowRightPng from '../../assets/images/arrowright.png'

@connect(({ board }) => ({
  boards: board.boards,
  movies: board.movies
}), (dispatch) => ({
  getBoardData () {
    dispatch(getBoards())
  }
}))
class Board extends Component {
  componentDidMount () {
    this.props.getBoardData()
  }

  navigateToList = (item) => {
    Taro.navigateTo({
      url: '/pages/list/index?type=' + item.key + '&title=' + item.title
    })
  }

  navigateToItem = (id) => {
    Taro.navigateTo({
      url: '/pages/item/index?id=' + id
    })
  }

  render () {
    return(
      <View className='md-board'>
        <View className='md-board__slide'>
          <Swiper className='md-board__swiper' indicator-dots autoplay interval={3000} duration={1000}>
            {
              this.props.movies.map((movie, index) => (
                <SwiperItem key={index}>
                  <Image className='md-board__slide-image' src={movie.images.large} mode='aspectFill' />
                </SwiperItem>
              ))
            }
          </Swiper>
        </View>
        <View className='md-board__list' scroll-y>
          {
            this.props.boards.map((item, index) => (
              <Block key={item.key}>
                <View className='md-board__item'>
                  <View className='md-board__title' onClick={this.navigateToList.bind(this, item)}>
                    <Text className='md-board__title-text'>{ item.title }</Text>
                    <Image className='md-board__title-image' src={arrowRightPng} mode='aspectFill' />
                  </View>
                  <ScrollView className='md-board__content' scroll-x>
                    {
                      item.key !== 'us_box' ?
                        <View className='md-board__inner'>
                          {
                            item.subjects.map((movie, i) => (
                              <View className='md-board__movie' key={movie.id + index + i} onClick={this.navigateToItem.bind(this, movie.id)}>
                                <Image className='md-board__movie-image' src={movie.images.large} mode='aspectFill' />
                                <Text className='md-board__movie-text'>{ movie.title }</Text>
                              </View>
                            ))
                          }
                        </View> :
                        <View className='md-board__inner'>
                          {
                            item.subjects.map((movie, i) => (
                              <View className='md-board__movie' key={movie.rank + index + i} onClick={this.navigateToItem.bind(this,  movie.subject.id)}>
                                <Image className='md-board__movie-image' src={movie.subject.images.large} mode='aspectFill' />
                                <Text className='md-board__movie-text'>{  movie.subject.title }</Text>
                              </View>
                            ))
                          }
                        </View>
                    }
                  </ScrollView>
                </View>
              </Block>
            ))
          }
        </View>
      </View>
    )
  }
}

export default Board
