import { handleActions } from 'redux-actions'

import { requestPending, requestSuccess, requestFail } from '../../../redux/api/request'
import { USERS_GET } from './types'


const initialState = {
  data: null,
  status: null,
  error: null,
  message: '',
}

export default handleActions({
  [requestPending(USERS_GET)]: (state) => ({
    ...state,
    data: null,
    status: requestPending(USERS_GET),
    error: false,
    message: '',
  }),

  [requestSuccess(USERS_GET)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(USERS_GET),
    data: payload,
    error: null,
  }),

  [requestFail(USERS_GET)]: (state, { payload }) => ({
    ...state,
    data: payload.data,
    status: requestFail(USERS_GET),
    error: true,
    message: `${payload.status} - ${payload.statusText}`,
  }),
}, initialState)
