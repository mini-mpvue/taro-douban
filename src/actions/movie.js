import { MOVIE_LIST, CLEAR_MOVIE, MOVIE_ITEM } from '../constants/movie'
import { getBoardData } from '../utils/api'

export function clearMovies () {
  return {
    type: CLEAR_MOVIE,
    payload: {
      movies: [],
      hasMore: true,
      page: 1
    }
  }
}

export function getMovies ({ type }) {
  return (dispatch, getState) => {
    const state = getState()
    const { search, page, movies } = state.movie
    getBoardData({ board: type, page, search })
      .then(data => {
        dispatch({
          type: MOVIE_LIST,
          payload: {
            movies: movies.concat(data.subjects),
            hasMore: !data.subjects.length ? false : type === 'us_box' ? false: true,
            type
          }
        })
      })
  }
}
