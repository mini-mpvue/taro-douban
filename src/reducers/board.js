import { BOARD_MOVIE_LIST } from '../constants/board'

const INITIAL_STATE = {
  boards: [
    // { key: 'top250' },
    // { key: 'us_box' },
    // { key: 'in_theaters' },
    { key: 'coming_soon' }
  ],
  movies: []
}

export default function board (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BOARD_MOVIE_LIST:
      return {
        ...state,
        boards: action.payload,
        movies: action.payload[0].subjects
      }
     default:
       return state
  }
}
