import { 
  ADD_PROJECT,
  SET_PROJECTS,
  CHANGE_PROJECT,
  REMOVE_PROJECT
} from './actionTypes';

const initialState =  {
  projects:[],
  lastProjectId:0
}

//Reducer function
export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_PROJECT: {
        const {
          data: {
				  employees,
			      creationDate,
			      name,
			      description
          }
        } = action;
		
        const id = state.lastProjectId + 1

		const projects = [
          ...state.projects,
          { id, employees, creationDate, name, description }
        ];

		  return {
          ...state,
          projects,
          lastProjectId: id
        };
    }

	 case SET_PROJECTS: {
      const { projects } = action.data;
      return { ...state, projects };
    }
	
 
    case CHANGE_PROJECT: {
		const { projects } = state;
			 
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

		const newProject = {
							  id,
							  employeeId,
							  projectId,
							  projectName,
							  name,
							  description
		};
			 
		for(let i = 0; i < projects.length; i++) {
         if(projects[i].id === action.data.id) {
           projects[i]=newProject;
           break;
        }
       }

	   return { ...state, projects};
  }
  
  case REMOVE_PROJECT: {
    const { projects: oldProjects } = state;
    const { id } = action.data;

    const projects = oldProjects
      .filter(projects => projects.id !== id);

    return { ...state, projects }
  }
    default:
      return state
  }
  
} 
