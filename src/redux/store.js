import { createStore, applyMiddleware, redux, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import axiosMiddlewareOptions from './axiosMiddlewareOptions';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import { apiUrl } from '../urls';

		
const logMiddleware = store => next => action => {
	if (action.type) {
	  console.log(action.type);
	}
	next(action);
}


const client = axios.create({
  baseURL:apiUrl,
  responseType: 'json'
});

const store = createStore(
rootReducer,
  compose(
    applyMiddleware(thunk,logMiddleware,axiosMiddleware(client,axiosMiddlewareOptions))
  )
);

export default store;
