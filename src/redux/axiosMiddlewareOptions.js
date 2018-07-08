import { apiUrl } from '../urls';

const axiosMiddlewareOptions = {
  baseURL:apiUrl,
  responseType: 'json',
  axios: {
    baseURL: apiUrl,
    responseType: 'json',
  },
  //opt
  options: {
    interceptors: {
      request: [
        (getState, config) => {
          alert('here');
	  
		   if ((getState().auth_token)&&(getState().auth_token.length>0)) {
                        config.headers['authtoken'] = getState().auth_token
           }

          return config
        }
      ],
      response: [
        (getState, response) => {
         
          return response
        }
      ]
    }
  }
};

export default axiosMiddlewareOptions;