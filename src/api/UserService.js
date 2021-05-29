import api from './index'

// eslint-disable-next-line
export default {
  userLogin(username, password) {
    return api().post('auth/userLogin', {username, password}, { withCredentials: true })
  },

  getCurrentUserData(uid) {
    return api().get(`auth/getUserData/${uid}`, { withCredentials: true })
  },

  checkSession(uid) {
    return api().get(`auth/checkSession/${uid}`, { withCredentials: true })
  },

  logout() {
    return api().get('auth/logout', { withCredentials: true })
  },

  updateUser(user, type) {
    return api().post(`auth/updateUser/${user._id}`, { user }, { withCredentials: true })
  },

  createUser({ username, password, email, birthday }) {
    return api().post('auth/userRegister', {username, password, email, birthday}, { withCredentials: true })
  },

}