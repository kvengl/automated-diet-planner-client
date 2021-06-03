import {
    SET_OPTIMAL_PRODUCTS,
    SET_OPTIMAL_STATUS
  } from '../constants/ActionTypes'
  
  const initialState = {
    optimal_products: null,
    status: false
  }
  
  export default function optimization(state = initialState, action) {
    switch (action.type) {
      case SET_OPTIMAL_PRODUCTS:
        return { ...state, optimal_products: action.items }
      case SET_OPTIMAL_STATUS:
        return { ...state, status: action.items }  
      default:
        return state
    }
  }