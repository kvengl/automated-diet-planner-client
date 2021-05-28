import axios from 'axios'
export const baseURL = 'https://localhost:3001/'
export default () => {
  return axios.create({
    baseURL
  })
}