import { 
  SET_CURRENT_USER,
  SET_LOGGED_USER,
  DELETE_EMPLOYEE_STORE
} from './actionTypes';


import { 
  employeeTasksUrl,
  employeeProjectsUrl,
  employeeUrl,
  employeesUrl
} from '../urls';

export const setCurrentUserData = (id,isUserLoaded) => dispatch => {
  if (!isUserLoaded) {
    dispatch(loadEmployee(id));
  }
  dispatch(setUserProjects(id));
  dispatch(setUserTasks(id));
}   


export const setUserTasks = (id) => {
  return {
    types: ['LOAD','SET_USER_TASKS','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: employeeTasksUrl(id), 
        method: 'get'
      }
    }
  }
}


export const setUserProjects = (id) => { 
  return {
    types: ['LOAD','SET_USER_PROJECTS','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: employeeProjectsUrl(id), 
        method: 'get'
      }
    }
  }
}

export const loadEmployee = (id) => { 
  return {
    types: ['LOAD','LOAD_EMPLOYEE','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: employeeUrl(id), 
        method: 'get'
      }
    }
  }
}

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  data:{
    currentUser:user
  }
});

export const setLoggedUser = (user) => ({
  type: SET_LOGGED_USER,
  data:{
    loggedUser:user
  }
});

export const setUserSkill = (currentUser,id,name) => {
  const newSkill={id,name};
  const newUser={...currentUser,skillId:id,skill:newSkill};
  return {
    types: ['LOAD','CHANGE_USER_SKILL','REQUEST_FAIL'],
    payload: {
      request:  {
        url: employeeUrl(currentUser.id), 
        method: 'put',
        data:newUser
      }
    }
  }
}

export const setUserSkillLevel = (currentUser,id,name) => {
  const newSkillLevel={id,name};
  const newUser={...currentUser,skillLevelId:id,skillLevel:newSkillLevel};

  return {
    types: ['LOAD','CHANGE_USER_SKILL_LEVEL','REQUEST_FAIL'],
    payload: {
      request:  {
        url: employeeUrl(currentUser.id), 
        method: 'put',
        data:newUser
      }
    }
  }
}

export const saveEmployee = (employee) => {
  return {
    types: ['LOAD','LOAD','REQUEST_FAIL'],
    payload: {
      request:  {
        url: employeeUrl(employee.id), 
        method: 'put',
        data:employee
      }
    }
  }
}

export const addEmployee = (employee) => {
  return {
    types: ['LOAD','ADD_EMPLOYEE','REQUEST_FAIL'],
    payload: {
      request:  {
        url: employeesUrl(), 
        method: 'post',
        data:employee
      }
    }
  }
}

export const deleteEmployee = (id) => {
  return {
    types: ['LOAD','LOAD','REQUEST_FAIL'],
    payload: {
      request:  {
        url: employeeUrl(id), 
        method: 'delete'
      }
    }
  }
}

export const setEmployees = () => {
  return {
    types: ['LOAD','SET_EMPLOYEES','REQUEST_FAIL'],
    payload: {
      request:  {
        url: employeesUrl(), 
        method: 'get'
      }
    }
  }
}

export const deleteEmployeeStore = (id) => {
  return {
    type: DELETE_EMPLOYEE_STORE,
    data:{
      id
    }
  }

}
