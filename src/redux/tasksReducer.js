import { 
  ADD_TASK,
  SET_TASKS,
  CHANGE_TASK,
  REMOVE_TASK
} from './actionTypes';

const initialState =  {
  tasks:[],
  lastTaskId:0
}

//Reducer function
export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_TASK: {
        const {
          data: {
				  employeeId,
			      projectId,
			      projectName,
			      name,
			      description
          }
        } = action;
		
        const id = state.lastTaskId + 1

		const tasks = [
          ...state.tasks,
          { id, employeeId, projectId, projectName, name, description }
        ];

		  return {
          ...state,
          tasks,
          lastTaskId: id
        };
    }

	 case SET_TASKS: {
      const { tasks } = action.data;
      return { ...state, tasks };
    }
	
 
    case CHANGE_TASK: {
		const { tasks } = state;
			 
		const {
          data: {
            	  id,
				  employeeId,
			      projectId,
			      projectName,
			      name,
			      description
          }
        } = action;

		const newTask = {
							  id,
							  employeeId,
							  projectId,
							  projectName,
							  name,
							  description
		};
			 
		for(let i = 0; i < tasks.length; i++) {
         if(tasks[i].id === action.data.id) {
           tasks[i]=newTask;
           break;
        }
       }

	   return { ...state, tasks};
  }
  
  case REMOVE_TASK: {
    const { tasks: oldTasks } = state;
    const { id } = action.data;

    const tasks = oldTasks
      .filter(task => task.id !== id);

    return { ...state, tasks }
  }
    default:
      return state
  }
  
} 
