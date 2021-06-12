import {
    SET_OPTIMAL_PRODUCTS,
    SET_OPTIMAL_STATUS,
    SET_OPTIMAL_STATISTIC
  } from '../constants/ActionTypes'
  
  const initialState = {
    optimal_products: null,
    status: false,
    statistic: null
  }
  
  export default function optimization(state = initialState, action) {
    switch (action.type) {
      case SET_OPTIMAL_PRODUCTS:
        return { ...state, optimal_products: action.items }
      case SET_OPTIMAL_STATUS:
        return { ...state, status: action.items }
      case SET_OPTIMAL_STATISTIC:
        return { ...state, statistic: action.items }
      default:
        return state
    }
  }