import { combineReducers } from 'redux'
import user from './user'
import dictionary from './dictionary'

const rootReducer = combineReducers({
  user,
  dictionary
})

export default rootReducer
