import api from './index'

// eslint-disable-next-line
export default {
  optimization(cards, calories, volume) {
    return api().post('products/optimization', {cards, calories, volume}, { withCredentials: true })
  },
}