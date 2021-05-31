import api from './index'

// eslint-disable-next-line
export default {
  getNutrientNorms() {
    return api().get('products/getNorms', { withCredentials: true })
  },
}