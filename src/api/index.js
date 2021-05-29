import axios from 'axios'

export const baseURL = 'http://localhost:3001/'
// eslint-disable-next-line
export default () => axios.create({ baseURL })