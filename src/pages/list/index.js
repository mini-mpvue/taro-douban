import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getMovies, clearMovies } from '../../actions/movie'
import MovieList from '../../components/movie-list'
import wx from '../../utils/wx'

import './index.scss'

@connect(({ movie }) => ({
  movies: movie.movies,
  hasMore: movie.hasMore
}), (dispatch) => ({
  clearMovieData () {
    dispatch(clearMovies())
  },
  getMovieData ({ type }) {
    dispatch(getMovies({ type }))
  }
}))
class List extends Component {
  config = {
    enablePullDownRefresh: true
  }

  state = {
    type: ''
  }

  getMovieList = () => {
    this.props.getMovieData({ type: this.state.type })
  }

  onReachBottom () {
    this.getMovieList()
  }

  async onPullDownRefresh () {
    this.props.clearMovieData()
    await this.getMovieList()
    wx.stopPullDownRefresh()
  }

  componentWillMount () {
    const { type, title } = this.$router.params
    wx.setNavigationBarTitle({ title: title + ' « 电影 « 豆瓣' })
    this.setState({ type })
  }

  componentDidMount () {
    this.getMovieList()
  }

  render() {
    return (
      <View className='md-list'>
        <MovieList movies={this.props.movies} hasMore={this.props.hasMore} type={this.state.type}></MovieList>
      </View>
    );
  }
}

export default List;
