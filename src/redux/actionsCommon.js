import axios from 'axios';

import { 
  SET_TOKEN,
  SET_ISLOADING,
  SET_HISTORY,
  
} from './actionTypes';

import { 
  authUrl,
  skillLevelsUrl,
  skillsUrl,
  positionsUrl,
  locationsUrl,
  employeeUrl
} from '../urls';

import {
  setCurrentUser,
  setLoggedUser,
  setCurrentUserData,
  
} from './actionsEmployee'

export const signin = (authData,history) => dispatch => {
  axios.post(authUrl(),authData)
    .then(({ data }) => {
      dispatch(setToken(data.token));
      dispatch(setCurrentUser(data.user));
      dispatch(setLoggedUser(data.user));
      dispatch(setCurrentUserData(data.user.id,true));
      dispatch(setCommonData());

      history.push('/employee/'+data.user.id);
    })
    .catch(error => {
      document.querySelector('#error-login--message').classList.remove('error-login--hide'); 
      dispatch(setToken('login_error'));
    });

};


export const signout = () => dispatch => {
  dispatch(setToken(''));
};

export const setCommonData = () => dispatch => {
  dispatch(setSkillLevels());
  dispatch(setSkills());
  dispatch(setPositions());
  dispatch(setLocations());
}   

export const setSkillLevels = () => { 
  return {
    types: ['LOAD','SET_SKILL_LEVELS','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: skillLevelsUrl(), 
        method: 'get'
      }
    }
  }
}

export const setSkills = () => { 
  return {
    types: ['LOAD','SET_SKILLS','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: skillsUrl(), 
        method: 'get'
      }
    }
  }
}

export const setPositions = () => { 
  return {
    types: ['LOAD','SET_POSITIONS','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: positionsUrl(), 
        method: 'get'
      }
    }
  }
}

export const setLocations = () => { 
  return {
    types: ['LOAD','SET_LOCATIONS','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: locationsUrl(), 
        method: 'get'
      }
    }
  }
}


export const setToken = (token) => ({
  type: SET_TOKEN,
  data:{
    auth_token:token
  }
});


export const setIsLoading = (isLoading) => ({
  type: SET_ISLOADING,
  data:{
    isLoading
  }	
});


export const setHistory = (history) => ({
  type: SET_HISTORY,
  data:{
    history
  }	
});


export const redirectToLogin = (history) => dispatch => {
  dispatch(setToken(''));
  history.push('/login');
};

export const setAvatar = (currentUser,avatar) => {
  const newUser={...currentUser,avatar};

  return {
    types: ['LOAD','CHANGE_USER_AVATAR','REQUEST_FAIL'],
    payload: {
      request:  {
        url: employeeUrl(currentUser.id), 
        method: 'put',
        data:newUser
      }
    }
  }
}
