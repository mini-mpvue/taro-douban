import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import MovieList from '../../components/movie-list'
import { getMovies, clearMovies } from '../../actions/movie'

import './index.scss'

@connect(({ movie }) => ({
  movies: movie.movies,
  hasMore: movie.hasMore
}), (dispatch) => ({
  clearMovieData () {
    dispatch(clearMovies())
  },
  getMovieData ({ q }) {
    dispatch(getMovies({ type: 'search', search: q }))
  }
}))
class Search extends Component {
  state = {
    q: '',
    subtitle: '请在此输入搜索内容'
  }

  getSearchData = () => {
    this.props.getMovieData({ q: this.state.q })
  }

  handleSearch = (e) => {
    this.setState({
      q: e.target.value
    }, (state, props) => {
      this.props.clearMovieData()
      this.getSearchData()
    })
  }

  onReachBottom () {
    this.getSearchData()
  }

  render() {
    return (
      <View class='md-search'>
        <View class='md-search__header'>
          <Input class='md-search__input' value={this.state.q} placeholder={this.state.subtitle} placeholder-class='md-search__placeholder' auto-focus onChange={this.handleSearch} />
        </View>
        { this.props.movies.length && <MovieList movies={this.props.movies} hasMore={this.props.hasMore}></MovieList> }
      </View>
    )
  }
}

export default Search
