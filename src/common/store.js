import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createHashHistory} from 'history'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducers'
import signInMiddleware from '../sign_in/signInMiddleware'
import loginMiddleware from '../login/loginMiddleware'
import middleware from '../task_management/taskManagementMiddleware'

export const history = createHashHistory()
const RouterMiddleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducer,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware, loginMiddleware, signInMiddleware, RouterMiddleware))
)

export default store
