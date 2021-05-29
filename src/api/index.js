import axios from 'axios'
export const baseURL = 'http://localhost:3001/'
export default () => {
  return axios.create({
    baseURL
  })
}