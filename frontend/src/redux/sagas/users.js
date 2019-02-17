// import { put, takeLatest } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'

import apiCall from '../api/apiCall'
import { USERS_GET } from '../modules/users/types'


const doGetUsers = apiCall({
  type: USERS_GET,
  method: 'get',
  path: 'http://127.0.0.1:8000/api/v1/users/',
})

export default function* rootSaga() {
  yield takeLatest(USERS_GET, doGetUsers)
}
