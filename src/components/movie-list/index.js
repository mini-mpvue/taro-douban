import Taro, { Component} from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import MovieItem from '../movie-item'

import loadingGif from '../../assets/images/loading.gif'

import './index.scss'

class MovieList extends Component {
  state = {  }
  render() {
    return (
      <View class='md-movie-list'>
        <View class='md-movie-list__list'>
          {
            this.props.type !== 'us_box' ?
              this.props.movies.map(item => (
                <navigator url={'../item/main?id=' + item.id} key={item.id}>
                  <MovieItem movie={item}></MovieItem>
                </navigator>
              )) :
              this.props.movies.map(item => (
                <navigator url={'../item/main?id=' + item.subject.id} key={item.rank}>
                  <MovieItem movie={item.subject}></MovieItem>
                </navigator>
              ))
          }
          <View class='md-movie-list__tips'>
            {
              this.props.hasMore ?
                <View>
                  <Image class='md-movie-list__tips-image'  src={loadingGif} mode='aspectFill' />
                  <Text class='md-movie-list__tips-text'>正在加载...</Text>
                </View> :
                <View>
                  <Text>--------------- 我也是有底线的 --------------</Text>
                </View>
            }
          </View>
        </View>
      </View>
    );
  }
}

export default MovieList;
