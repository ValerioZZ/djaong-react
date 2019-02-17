import fp from 'lodash/fp'

export const usersSelector = fp.compose(fp.defaultTo([]), fp.get('users.data'))
