import { 
  SET_CURRENT_TASK
  
} from './actionTypes';

import { 
  taskUrl,
  tasksUrl  
} from '../urls';

export const saveTask = (task) => {
  return {
    types: ['LOAD','LOAD','REQUEST_FAIL'],
    payload: {
      request:  {
        url: taskUrl(task.id), 
        method: 'put',
        data:task
      }
    }
  }
}

export const addTask = (task) => {
  return {
    types: ['LOAD','ADD_PROJECT_TASK','REQUEST_FAIL'],
    payload: {
      request:  {
        url: tasksUrl(), 
        method: 'post',
        data:task
      }
    }
  }
}

export const setCurrentTask = (task) => ({
  type: SET_CURRENT_TASK,
  data:{
    currentTask:task
  }
});
