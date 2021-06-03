import { combineReducers } from 'redux'
import user from './user'
import dictionary from './dictionary'
import optimization from './optimization'

const rootReducer = combineReducers({
  user,
  dictionary,
  optimization
})

export default rootReducer