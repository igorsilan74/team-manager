import { 
  ADD_PROJECT,
  SET_PROJECTS,
  CHANGE_PROJECT,
  SET_PROJECT_EMPLOYEES,
  SET_PROJECT_TASKS,
  LOAD_PROJECT,
  SET_CURRENT_PROJECT,
  DELETE_PROJECT_EMPLOYEE,
  ADD_PROJECT_EMPLOYEE,
  SET_PROJECT_TASKS_STORE,
  ADD_PROJECT_TASK,
  DELETE_PROJECT_STORE
} from './actionTypes';

const initialState =  {
  projects:[],
  currentProject:{},
  currentProjectTeam:[],
  currentProjectTasks:[]
}

//Reducer function
export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_PROJECT: {
      if (!action.payload.data) {
	    return state;
	  }
	  
      const { data:currentProject } = action.payload;
	  return { ...state, currentProject };
    }
	
	
	case SET_PROJECT_EMPLOYEES: {
	  if (!action.payload.data) {
	    return state;
	  }
      const { data:currentProjectTeam } = action.payload;
      return { ...state, currentProjectTeam };
    } 
	
	
	case SET_PROJECT_TASKS: {
	  if (!action.payload.data) {
	    return state;
	  }
      const { data:currentProjectTasks } = action.payload;
      return { ...state, currentProjectTasks };
    } 
	
	
	case SET_PROJECT_TASKS_STORE: {
      const { currentProjectTasks, task } = action.data;
	  
	  if (currentProjectTasks.length>0) {
	    for (let i=0;i<currentProjectTasks.length;i++) {
			if (currentProjectTasks[i].id===task.id) {
				currentProjectTasks[i]=task;
				break;
			}
		}
	  }
	  
      return { ...state, currentProjectTasks };
    }

	case DELETE_PROJECT_STORE: {
      const { id } = action.data;
	  const projects = [...state.projects];
	  
	  if (projects.length>0) {
	    for (let i=0;i<projects.length;i++) {
			if (projects[i].id===id) {
				projects.splice(i,1);
				break;
			}
		}
	  }
	  
      return { ...state, projects };
    }
		
	
	case LOAD_PROJECT: {
	  if (!action.payload.data) {
	    return state;
	  }
	  
      const { data:currentProject } = action.payload;
	  return { ...state, currentProject };
    }

	
	case SET_PROJECTS: {
	  if (!action.payload.data) {
	    return state;
	  }
	  const { data:projects } = action.payload;
      return { ...state, projects };
    }
	
	
    case SET_CURRENT_PROJECT: {
      const { currentProject } = action.data;
      return { ...state, currentProject };
    }

	
	case DELETE_PROJECT_EMPLOYEE: {
	  if (!action.payload.data) {
	    return state;
	  }
      const { data:currentProjectTeam } = action.payload;
      return { ...state, currentProjectTeam };
    }
	
	
	case ADD_PROJECT_EMPLOYEE: {
	  if (!action.payload.data) {
	    return state;
	  }
      const { data:currentProjectTeam } = action.payload;
      return { ...state, currentProjectTeam };
    }
	
  
    case ADD_PROJECT_TASK: {
      if (!action.payload.data) {
	    return state;
	  }
	  
      const { data:currentTask } = action.payload;
	  const currentProjectTasks = [...state.currentProjectTasks];
	  currentProjectTasks.push(currentTask);
	  
	  return { ...state, currentProjectTasks };
    }

	
    default:
      return state
  }
  
} 
