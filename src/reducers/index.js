import { combineReducers } from 'redux'
import counter from './counter'
import board from './board'
import movie from './movie'

export default combineReducers({
  counter,
  board,
  movie
})
