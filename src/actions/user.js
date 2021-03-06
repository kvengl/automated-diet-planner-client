import * as types from '../constants/ActionTypes'
import UserService from '../api/UserService'
import history from '../history'
import * as cookies from '../libs/cookies'
import { getAge } from '../libs/user'
import { message } from 'antd'

export function setUser(user) {
  console.log('[USER] объект пользователя установлен')
  history.push(window.URL_PREFIX)
  const role = user.auth.role.value
  const age = getAge(user.auth.birthday)
  return {
    type: types.USER_LOGIN,
    role,
    age,
    user
  }
}

export function checkSession(uid) {
  console.log('[USER] Проверка сессии пользователя')
  return (dispatch) => {
    UserService.checkSession(uid).then(response => {
      if (response.data.ok === true) {
        console.log('[USER] Сессия действительна')
        dispatch(getCurrentUserData(uid))
      } else {
        console.log('[USER] Сессия недействительна. Очистка данных пользователя')
        dispatch(clearStore())
      }
    })
  }
}
export function clearStore() {
  return (dispatch) => {
    UserService.logout()
    dispatch(clearUser())
  }
}

export function clearUser() {
  cookies.deleteCookie('uid')
  return {
    type: types.USER_CLEAR,
    user: {}
  }
}

export function userLogin(username, password) {
  return (dispatch) => {
    if (!username || !password)
    message.error('Заполните все поля', 3)
    else
      UserService.userLogin(username, password).then(session => {
        session = session.data
        if (session.error) {
          message.error(session.error, 3)
          return
        }
        console.log('[USER] Авторизация успешна. Cookie установлена. Выполняется получение данных пользователя')
        dispatch(getCurrentUserData(session.BSLOGIN))
        dispatch(checkSession(session.BSLOGIN))
      })
      .catch(e => message.error('Ошибка сети', 3))
  }
}

export function getCurrentUserData(uid) {
  return (dispatch) => {
    UserService.getCurrentUserData(uid).then(response => {
      console.log('[USER] Данные пользователя получены: ')
      cookies.setCookie('uid', uid)
      console.log('[USER] UID установлен в cookies')
      dispatch(setUser(response.data.object))
    }).catch(err => {
      console.log('[USER] Ошибка при получении данных пользователя: ', err)
      dispatch(clearStore())
    })
  }
}

export function userRefresh() {
  return (dispatch) => {
    let uid = cookies.getCookie('uid')
    if (uid) {
      console.log('[USER] Запись о пользователе существует. Обновить данные')
      dispatch(checkSession(uid))
    } else {
      console.log('[USER] Запись о пользователе отсутствует. Выполните вход')
      dispatch(clearStore())
    }
  }
}

export function updateUser(data) {
  return (dispatch) => {
    UserService.updateUser(data).then(response => {
      if (response.data.ok)
        message.info('Данные обновлены', 3)
      else message.error(response.data.error, 3)
      dispatch(setUser(data))
    })
  }
}

export function createUser(data) {
  return (dispatch) => {
    UserService.createUser(data).then(response => {
      if (response.data.ok) {
        history.push(`${window.URL_PREFIX}login`)
        message.success('Вы успешно завершили регистрацию', 3)
      }
      else message.error(response.data.error, 3)
    })
  }
}