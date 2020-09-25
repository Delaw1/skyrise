import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
// import throttle from 'lodash/throttle'

const loggerMiddleware = createLogger()

export const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware))