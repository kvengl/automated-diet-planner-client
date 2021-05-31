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
export function setNormNutrients(items) {
  console.log("[DICTIONARY] [success] Нормы нутриентов получены")
  return {
    type: types.SET_NUTRIENT_NORMS,
    items
  }
}