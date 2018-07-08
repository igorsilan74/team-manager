import { combineReducers } from 'redux';
import  commonReducer  from './commonReducer';
import  employeeReducer  from './employeeReducer';
import  tasksReducer   from './tasksReducer';
import  projectsReducer  from './projectsReducer';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
  common:commonReducer,
  employee:employeeReducer,
  tasks:tasksReducer,
  projects:projectsReducer,
  routing:routing
})


