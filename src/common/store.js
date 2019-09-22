import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createHashHistory} from 'history'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducers'
import signInMiddleware from '../sign_in/signInMiddleware'
import authenticationMiddleware from '../authentication/authenticationMiddleware'
import middleware from '../task_management/taskManagementMiddleware'

export const history = createHashHistory()
const RouterMiddleware = routerMiddleware(history)

const appReducer = combineReducers({...reducer, router: routerReducer})

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_STATE") {
      state = undefined;
  }
  return appReducer(state, action);
};
const storeEnhancer = applyMiddleware(middleware, authenticationMiddleware, signInMiddleware, RouterMiddleware)

const store = createStore(rootReducer, composeWithDevTools(storeEnhancer))

export default store
