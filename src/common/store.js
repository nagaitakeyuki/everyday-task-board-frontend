import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createHashHistory} from 'history'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducer/reducers'
import middleware from './middleware'

export const history = createHashHistory()
const RouterMiddleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducer,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware, RouterMiddleware))
)

export default store
