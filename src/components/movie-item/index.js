import Taro, { Component} from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'

import './index.scss'

class MovieItem extends Component {
  state = {  }
  render() {
    const movie = this.props.movie

    return (
      <View class='md-movie-item'>
        <View class='md-movie-item__item'>
          <Image class='md-movie-item__poster' src={movie.images.small}></Image>
          <View class='md-movie-item__meta'>
            <Text class='md-movie-item__title'>{movie.title}</Text>
            <Text class='md-movie-item__sub-title'>{movie.original_title} ({movie.year})</Text>
            <View class='md-movie-item__artists'>
              导演：{
                movie.directors.map(director => (
                  <Block key={director.id}> {director.name} </Block>
                ))
              }
            </View>
          </View>
          <View class='md-movie-item__rating'>
            <Text class='md-movie-item__rating-text'>{ movie.rating.average }</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default MovieItem;
