import { MOVIE_LIST, CLEAR_MOVIE, MOVIE_ITEM } from '../constants/movie'

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
    case CLEAR_MOVIE:
      return {
        ...state,
        ...action.payload
      }
     default:
       return state
  }
}
