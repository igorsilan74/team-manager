import { 
  ADD_TASK,
  SET_TASKS,
  CHANGE_TASK,
  LOAD_TASK,
  SET_CURRENT_TASK
} from './actionTypes';

const initialState =  {
  tasks:[],
  currentTask:{}
}

//Reducer function
export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_TASK: {
      if (!action.payload.data) {
	    return state;
	  }

      const { data:currentTask } = action.payload;
	  const tasks = [...state.tasks];
	  tasks.push(currentTask);
	  
	  return { ...state, currentTask, tasks };
    }
	
	
	case LOAD_TASK: {
	  if (!action.payload.data) {
	    return state;
	  }
	  
      const { data:currentTask } = action.payload;
	  return { ...state, currentTask };
    }

	
	case SET_TASKS: {
	  if (!action.payload.data) {
        return state;
	  }
	  const { data:tasks } = action.payload;
      return { ...state, tasks };
    }
	
	
    case SET_CURRENT_TASK: {
      const { currentTask } = action.data;
      return { ...state, currentTask };
    }
	

    default:
      return state
  }
  
} 
