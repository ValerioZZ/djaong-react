import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'

import { requestFail, requestPending, requestSuccess } from './request'

const defaultHeaders = () => {
  const token = localStorage.getItem('token')

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Token ${token}`
  }

  return headers
}

export default ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  path,
  data,
  datafn,
  params: sagaParams,
  headers,
  baseURL,
  success,
  fail,
  payloadOnSuccess,
  payloadOnFail,
}) => function* (action) {
  const {
    params,
    data,
    headers: customHeaders,
    success: successCallback,
    fail: failCallback,
    resolve,
    reject,
  } = (action.payload || {})

  try {
    const reqHeaders = Object.assign({}, defaultHeaders(), headers)

    yield put({
      type: requestPending(type),
    })

    const url = typeof path === 'function' ? path(action) : path

    const processedData = typeof datafn === 'function' ? datafn(action) : data

    const res = yield call(axios.request, {
      url,
      method: method.toLowerCase(),
      headers: {
        ...reqHeaders,
        ...(customHeaders || {}),
      },
      data: processedData,
      params: { ...sagaParams, ...params },
      baseURL: `${baseURL || '/api/v1/'}`,
    })
    const payload = payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data

    yield put({
      type: requestSuccess(type),
      payload,
    })

    if (resolve) {
      yield resolve(payload)
    }

    success && (yield success(res.data, action))
    successCallback && successCallback(res.data)

    return true
  } catch (err) {
    const errRes = get(err, 'response', err)
    const payload = payloadOnFail ? payloadOnFail(errRes, action) : errRes

    yield put({
      type: requestFail(type),
      payload,
    })

    if (reject) {
      yield reject(payload)
    }

    fail && (yield fail(errRes))
    failCallback && failCallback(errRes)

    return false
  }
}
