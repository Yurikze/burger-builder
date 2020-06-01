import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export function* logoutSaga(action) {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expiryDate')
  yield localStorage.removeItem('userId')
  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart())
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  }
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXDNRiq8civmY8gkxQBUxuxiutqiYwNj8'
  if (!action.isSignup) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXDNRiq8civmY8gkxQBUxuxiutqiYwNj8'
  }
  try {
    const response = yield axios.post(url, authData)
    const expiryDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    )
    yield localStorage.setItem('token', response.data.idToken)
    yield localStorage.setItem('expiryDate', expiryDate)
    yield localStorage.setItem('userId', response.data.localId)
    yield put(actions.authSuccess(response.data.idToken, response.data.localId))
    yield put(actions.checkAuthTimeout(response.data.expiresIn))
  } catch (error) {
    yield put(actions.authFail(error.response.data.error))
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.logout())
  } else {
    const expiryDate = yield new Date(localStorage.getItem('expiryDate'))
    if (expiryDate > new Date()) {
      yield put(actions.authSuccess(token, localStorage.getItem('userId')))
      yield put(
        actions.checkAuthTimeout(
          (expiryDate.getTime() - new Date().getTime()) / 1000
        )
      )
    } else {
      yield put(actions.logout())
    }
  }
}
