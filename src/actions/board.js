import { BOARD_MOVIE_LIST } from '../constants/board'
import { getBoardData } from '../utils/api'

export function getBoards () {
  return (dispatch, getState) => {
    const state = getState()
    const tasks = state.board.boards.map(board => {
      return getBoardData({ board: board.key, page: 1, count: 8 })
    })
    Promise.all(tasks).then(boards => {
      dispatch({
        type: BOARD_MOVIE_LIST,
        payload: boards
      })
    })
  }
}
