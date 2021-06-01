import {
  USER_LOGIN,
  USER_CLEAR
} from '../constants/ActionTypes'

const initialState = {
  status: 'unknown',
  role: null,
  age: null,
  data: {}
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        status: 'confirmed',
        role: action.role,
        data: action.user,
        age: action.age
      }
    case USER_CLEAR:
      return {
        status: 'unregistered',
        role: null,
        data: {}
      }

    default:
      return state
  }
}