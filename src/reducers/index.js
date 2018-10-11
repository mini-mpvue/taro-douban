import { combineReducers } from 'redux'
import counter from './counter'
import board from './board'

export default combineReducers({
  counter,
  board
})
