import Taro, { Component } from '@tarojs/taro'
import { View, Image, Block, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getMovie, clearMovie } from '../../actions/movie'
import wx from '../../utils/wx'

import './index.scss'

@connect(({ movie }) => ({
  movie: movie.movie
}), (dispatch) => ({
  getMovieData (id) {
    dispatch(getMovie(id))
  },
  clearMovieItemData () {
    dispatch(clearMovie())
  }
}))
class Item extends Component {
  state = {
    id: ''
  }

  componentWillMount () {
    this.setState({
      id: this.$router.params.id
    })
  }

  componentWillUnmount () {
    this.props.clearMovieItemData()
  }

  componentDidMount () {
    this.props.getMovieData(this.state.id)
  }

  componentWillReceiveProps (nextProps) {
    wx.setNavigationBarTitle({ title: nextProps.movie.title + ' « 电影 « 豆瓣' })
  }

  render() {
    const movie = this.props.movie

    return (
      <View class='md-item'>
        { movie.images && <Image class='md-item__background' src={movie.images.large} mode='aspectFill' /> }
        {
          movie.title && <Block v-if=''>
            <View class='md-item__meta'>
              <Image class='md-item__poster' src={movie.images.large} mode='aspectFit' />
              <Text class='md-item__title'>{movie.title}({movie.year})</Text>
              <Text class='md-item__info'>评分：{movie.rating.average }</Text>
              <Text class='md-item__info'>
                导演：{movie.directors.map(director => (<Block key={director.id}> {director.name + ' '} </Block>))}
              </Text>
              <Text class='md-item__info'>
                主演：{movie.casts.map(cast => (<Block key={cast.id}> {cast.name + ' '} </Block>))}
              </Text>
            </View>
            <View class='md-item__summary'>
              <Text class='md-item__label'>摘要：</Text>
              <Text class='md-item__content'>{movie.summary}</Text>
            </View>
          </Block>
      }
      </View>
    )
  }
}

export default Item
