import { createAction } from 'redux-actions'

import { USERS_GET } from './types'


export const getUsers = createAction(USERS_GET)
