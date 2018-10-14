import { MOVIE_LIST, CLEAR_MOVIE_LIST, MOVIE_ITEM, CLEAR_MOVIE_ITEM } from '../constants/movie'

const INITIAL_STATE = {
  movies: [],
  page: 1,
  type: '',
  hasMore: true,
  movie: {},
  cachedMovies: []
}

export default function movie (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MOVIE_LIST:
      return {
        ...state,
        ...action.payload,
        page: state.page + 1
      }
    case CLEAR_MOVIE_LIST:
    case  CLEAR_MOVIE_ITEM:
      return {
        ...state,
        ...action.payload
      }
    case MOVIE_ITEM:
      if (!action.payload.match) {
        state.cachedMovies.unshift(action.payload.movie)
      }
      return {
        ...state,
        movie: action.payload.movie
      }
     default:
       return state
  }
}
