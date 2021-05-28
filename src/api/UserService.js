import api, { baseURL } from './index'

export default {
  userLogin(username, password) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('get', baseURL + 'getBS', false, username, password)
      xhr.send('')
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response))
      } else if (xhr.status === 401) {
        resolve({error: 'Неверный логин или пароль'})
      } else {
        reject()
      }
    })
  },

  getCurrentUserData(uid) {
    return api().get(`objects/${uid}`)
  },

  checkSession(uid) {
    return api().get(`checkSession/${uid}`, { withCredentials: true })
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
    return api().get(`/register?username=${username}&password=${password}&email=${email}&birthday=${birthday}`)
  },

}