import api from './index'

// eslint-disable-next-line
export default {
  optimization(cards) {
    return api().post('products/optimization', {cards}, { withCredentials: true })
  },
}