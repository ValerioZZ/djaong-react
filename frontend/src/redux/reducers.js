import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';

import * as reducers from './modules'

export default (history) => 
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  })
