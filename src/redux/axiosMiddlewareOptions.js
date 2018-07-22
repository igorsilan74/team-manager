import { apiUrl } from '../urls';
import { redirectToLogin } from './actions';

  
  const axiosMiddlewareOptions = {
    interceptors: {
      request: [{
        success: function ({getState, dispatch, getSourceAction}, req) {
		   if (getState().common.auth_token) {
               req.headers['authtoken'] = getState().common.auth_token;
           }
		   
          return req;
          //...
        },
        error: function ({getState, dispatch, getSourceAction}, error) {
			return error;
          //...
        }
      }
      ],
      response: [{
        success: function ({getState, dispatch, getSourceAction}, req) {
		  return req;
          //...
        },
        error: function ({getState, dispatch, getSourceAction}, error) {
			dispatch(redirectToLogin(getState().common.currentHistory));
			return error;
          //...
        }
      }
      ]
    }
  };
  
export default axiosMiddlewareOptions;  
	