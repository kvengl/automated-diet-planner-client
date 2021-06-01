import * as types from '../constants/ActionTypes'
import DictionaryService from "../api/DictionaryService"

export function getNutrientNorms() {
  return (dispatch) => {
    console.log("[DICTIONARY] [try] Получение норм нутриентов...")
    DictionaryService.getNutrientNorms().then(response => {
      dispatch(setNormNutrients(response.data.message))
    })
  }
}

export function getProducts() {
  return (dispatch) => {
    console.log("[DICTIONARY] [try] Получение списка продуктов...")
    DictionaryService.getProducts().then(response => {
      dispatch(setProducts(response.data.message))
    })
  }
}

export function getProductCategories() {
  return (dispatch) => {
    console.log("[DICTIONARY] [try] Получение списка категорий продуктов...")
    DictionaryService.getProductCategories().then(response => {
      dispatch(setProductCategories(response.data.message))
    })
  }
}

export function setNormNutrients(items) {
  console.log("[DICTIONARY] [success] Нормы нутриентов получены")
  return {
    type: types.SET_NUTRIENT_NORMS,
    items
  }
}

export function setProducts(items) {
  console.log("[DICTIONARY] [success] Список продуктов получен")
  return {
    type: types.SET_PRODUCTS,
    items
  }
}

export function setProductCategories(items) {
  console.log("[DICTIONARY] [success] Список категорий продуктов получен")
  return {
    type: types.SET_PRODUCT_CATEGORIES,
    items
  }
}