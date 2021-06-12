import * as types from '../constants/ActionTypes'
import OptimizationService from "../api/OptimizationService"

export function start_optimization(cards, calories, volume) {
  return (dispatch) => {
    console.log("[OPTIMIZATION] [try] Оптимизация...")
    dispatch(set_optimal_status(true))
    OptimizationService.optimization(cards, calories, volume).then(response => {
      dispatch(set_optimal_status(false))
      dispatch(set_optimal_products(response.data.message))
      dispatch(set_optimal_statistic(response.data.statistic))
    }).catch(() => dispatch(set_optimal_status(false)))
  }
}

export function set_optimal_products(items) {
  console.log("[OPTIMIZATION] [success] Ответ по оптимизации получен")
  return {
    type: types.SET_OPTIMAL_PRODUCTS,
    items
  }
}

export function set_optimal_statistic(items) {
  return {
    type: types.SET_OPTIMAL_STATISTIC,
    items
  }
}

export function set_optimal_status(items) {
    console.log("[OPTIMIZATION] [success] Овет получен")
    return {
      type: types.SET_OPTIMAL_STATUS,
      items
    }
  }