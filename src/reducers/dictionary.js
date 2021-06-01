import {
  SET_NUTRIENT_NORMS,
  SET_PRODUCTS,
  SET_PRODUCT_CATEGORIES
} from '../constants/ActionTypes'

const initialState = {
  nutrient_norms: [],
  products: [],
  product_categories: []
}

export default function dictionary(state = initialState, action) {
  switch (action.type) {
    case SET_NUTRIENT_NORMS:
      return { ...state, nutrient_norms: action.items }
    case SET_PRODUCTS:
      return { ...state, products: action.items }
    case SET_PRODUCT_CATEGORIES:
        return { ...state, product_categories: action.items }  
    default:
      return state
  }
}