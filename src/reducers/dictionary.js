import {
  SET_NUTRIENT_NORMS
} from '../constants/ActionTypes'

const initialState = {
  nutrient_norms: []
}

export default function dictionary(state = initialState, action) {
  switch (action.type) {
    case SET_NUTRIENT_NORMS:
      return { ...state, nutrient_norms: action.items }
    default:
      return state
  }
}
