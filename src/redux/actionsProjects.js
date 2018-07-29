import { 
  SET_PROJECT_TASKS_STORE,
  DELETE_PROJECT_STORE,
  SET_CURRENT_PROJECT,
  
} from './actionTypes';

import { 
  projectEmployeesUrl,
  projectEmployeeUrl,
  projectTasksUrl,
  projectUrl,
  projectsUrl,

} from '../urls';

export const setProjectEmployees = (id) => { 
  return {
    types: ['LOAD','SET_PROJECT_EMPLOYEES','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: projectEmployeesUrl(id), 
        method: 'get'
      }
    }
  }
}

export const deleteProjectEmployee = (id,employeeId) => { 
  return {
    types: ['LOAD','DELETE_PROJECT_EMPLOYEE','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: projectEmployeeUrl(id,employeeId), 
        method: 'delete'
      }
    }
  }
}

export const addProjectEmployee = (id,employeeId) => { 
  return {
    types: ['LOAD','ADD_PROJECT_EMPLOYEE','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: projectEmployeeUrl(id,employeeId), 
        method: 'put'
      }
    }
  }
}

export const setProjectTasks = (id) => {
  return {
    types: ['LOAD','SET_PROJECT_TASKS','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: projectTasksUrl(id), 
        method: 'get'
      }
    }
  }
}

export const setProjectTasksStore = (currentProjectTasks,task) => {
  return {
    type: SET_PROJECT_TASKS_STORE,
    data:{
      currentProjectTasks,
      task
    }
  }

}

export const deleteProjectStore = (id) => {
  return {
    type: DELETE_PROJECT_STORE,
    data:{
      id
    }
  }

}

export const loadProject = (id) => { 
  return {
    types: ['LOAD','LOAD_PROJECT','REQUEST_FAIL'],
    payload: {
      request:  { 
        url: projectUrl(id), 
        method: 'get'
      }
    }
  }
}


export const setCurrentProject = (project) => ({
  type: SET_CURRENT_PROJECT,
  data:{
    currentProject:project
  }
});


export const saveProject = (project) => {
  return {
    types: ['LOAD','LOAD','REQUEST_FAIL'],
    payload: {
      request:  {
        url: projectUrl(project.id), 
        method: 'put',
        data:project
      }
    }
  }
}

export const addProject = (project) => {
  return {
    types: ['LOAD','ADD_PROJECT','REQUEST_FAIL'],
    payload: {
      request:  {
        url: projectsUrl(), 
        method: 'post',
        data:project
      }
    }
  }
}

export const deleteProject = (id) => {
  return {
    types: ['LOAD','SET_PROJECTS','REQUEST_FAIL'],
    payload: {
      request:  {
        url: projectUrl(id), 
        method: 'delete'
      }
    }
  }
}

export const setProjects = () => {
  return {
    types: ['LOAD','SET_PROJECTS','REQUEST_FAIL'],
    payload: {
      request:  {
        url: projectsUrl(), 
        method: 'get'
      }
    }
  }
}
