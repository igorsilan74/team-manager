import { createStore, applyMiddleware, redux, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import axiosMiddlewareOptions from './axiosMiddlewareOptions';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';


		
const logMiddleware = store => next => action => {
	console.log(action.type);
	next(action);
}


const client = axios.create(
  axiosMiddlewareOptions
);

const store = createStore(
rootReducer,
  compose(
    applyMiddleware(thunk,logMiddleware,axiosMiddleware(client))
  )
);

export default store;


