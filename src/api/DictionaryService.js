import api from './index'

// eslint-disable-next-line
export default {
  getNutrientNorms() {
    return api().get('products/getNorms', { withCredentials: true })
  },
  getProducts() {
    return api().get('products/getProducts', { withCredentials: true })
  },
  getProductCategories() {
    return api().get('products/getCategories', { withCredentials: true })
  },
}