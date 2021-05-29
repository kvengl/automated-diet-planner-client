import api, { baseURL } from './index'

export default {
  // userLogin(username, password) {
  //   return new Promise((resolve, reject) => {
  //     var xhr = new XMLHttpRequest()
  //     xhr.open('get', baseURL + 'getBS', false, username, password)
  //     xhr.send('')
  //     if (xhr.status === 200) {
  //       resolve(JSON.parse(xhr.response))
  //     } else if (xhr.status === 401) {
  //       resolve({error: 'Неверный логин или пароль'})
  //     } else {
  //       reject()
  //     }
  //   })
  // },

  userLogin(username, password) {
    return api().post('auth/userLogin', {username, password}, { withCredentials: true })
  },

  getCurrentUserData(uid) {
    return api().get(`auth/getUserData/${uid}`, { withCredentials: true })
  },

  checkSession(uid) {
    return api().get(`auth/checkSession/${uid}`, { withCredentials: true })
  },

  logout(uid) {
    return api().get('auth/logout', { withCredentials: true })
  },

  updateUser(user) {
    let project = 'fsc'
    let object = user.object
    let system = user.system
    let data = {
      project,
      object: JSON.stringify(object),
      system: JSON.stringify(system)
    }
    return api().post(`/objects/${user.id}`, data)
  },

  createUser({ username, password, email, birthday }) {
    return api().post('auth/userRegister', {username, password, email, birthday}, { withCredentials: true })
  },

}