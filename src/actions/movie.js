import { MOVIE_LIST, CLEAR_MOVIE_LIST, MOVIE_ITEM, CLEAR_MOVIE_ITEM } from '../constants/movie'
import { getBoardData, getMovieData } from '../utils/api'

export function clearMovies () {
  return {
    type: CLEAR_MOVIE_LIST,
    payload: {
      movies: [],
      hasMore: true,
      page: 1
    }
  }
}

export function clearMovie () {
  return {
    type: CLEAR_MOVIE_ITEM,
    payload: {
      movie: {}
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

export function getMovie (id) {
  return (dispatch, getState) => {
    const state = getState()
    const { cachedMovies } = state.movie
    const matchMovie = cachedMovies.find(v => v.id === id)
    if (matchMovie) {
      return dispatch({
        type: MOVIE_ITEM,
        payload: {
          movie: matchMovie,
          match: true
        }
      })
    }
    getMovieData(id)
      .then(movie => {
        dispatch({
          type: MOVIE_ITEM,
          payload: {
            movie,
            match: false
          }
        })
      })
  }
}
