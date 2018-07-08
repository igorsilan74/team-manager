import { 
  ADD_EMPLOYEE,
  SET_EMPLOYEES, 
  CHANGE_EMPLOYEE, 
  REMOVE_EMPLOYEE,
  SET_CURRENT_USER,
  SET_USER_PROJECTS,
  SET_USER_TASKS,
  SET_USER_PROJECTS_TASKS,
  CHANGE_USER_SKILL,
  CHANGE_USER_SKILL_LEVEL,
  CHANGE_USER_AVATAR
} from './actionTypes';


const initialState =  {
  employees:[],
  lastEmployeeId:0,
  currentUser:{},
  currentUserProjects:[],
  currentUserTasks:[],
  currentUserProjectsTasks:[]
}

//Reducer function
export default (state = initialState, action) => {
  switch (action.type) {
  
    case ADD_EMPLOYEE: {
        const {
          data: {
				  name,
			      avatar,
			      email,
			      birthday,
			      password,
			      surName,
			      positionId,
			      position,
			      locationId,
			      location,
				  skillLevelId,
				  skillId
          }
        } = action;

        const id = state.lastEmployeeId + 1

		  const employees = [
          ...state.employees,
          { id, name, avatar, email, birthday, password, surName, positionId, position, locationId, location, skillLevelId, skillId}
        ];

		  return {
          ...state,
          employees,
          lastEmployeeId: id
        };
    }

	 case SET_EMPLOYEES: {
      const { employees } = action.data;
      return { ...state, employees };
    }
	
 
    case CHANGE_EMPLOYEE: {
		const { employees } = state;
			 
		const {
          data: {
            	  id,
				  name,
			      avatar,
			      email,
			      birthday,
			      password,
			      surName,
			      positionId,
			      position,
			      locationId,
			      location,
				  skillLevelId,
				  skillId				  
				  
          }
        } = action;

		const newEmployee = {
							  id,
							  name,
							  avatar,
							  email,
							  birthday,
							  password,
							  surName,
							  positionId,
							  position,
							  locationId,
							  location,
				              skillLevelId,
				              skillId							  
		};
			 
		for(let i = 0; i < employees.length; i++) {
         if(employees[i].id === action.data.id) {
           employees[i]=newEmployee;
           break;
        }
       }

	   return { ...state, employees};
  }
  
    case CHANGE_USER_SKILL: {
		const { currentUser } = state;
		const newSkill={
		  id:action.data.id,
		  name:action.data.name
		};
		
		const newCurrentUser = {...currentUser,skill:newSkill};
		newCurrentUser.skillId=action.data.id;
		
	   return { ...state, currentUser:newCurrentUser};
    }

    case CHANGE_USER_SKILL_LEVEL: {
		const { currentUser } = state;
		const newSkillLevel={
		  id:action.data.id,
		  name:action.data.name
		};
		
		const newCurrentUser = {...currentUser,skillLevel:newSkillLevel};
		newCurrentUser.skillLevelId=action.data.id;
		
	   return { ...state, currentUser:newCurrentUser};
  }
 
  case CHANGE_USER_AVATAR: {
		const { currentUser } = state;
		const newAvatar=action.data.avatar;
		
		const newCurrentUser = {...currentUser,avatar:newAvatar};
		
	   return { ...state, currentUser:newCurrentUser};
  }
 
  case REMOVE_EMPLOYEE: {
    const { employees: oldEmployees } = state;
    const { id } = action.data;

    const employees = oldEmployees
      .filter(employee => employee.id !== id);

    return { ...state, employees }
  }
  
  case SET_CURRENT_USER: {
      const { currentUser } = action.data;
      return { ...state, currentUser };
    }
 
  case SET_USER_PROJECTS: {
      const { currentUserProjects } = action.data;
      return { ...state, currentUserProjects };
  } 

  case SET_USER_TASKS: {
      const { currentUserTasks } = action.data;
      return { ...state, currentUserTasks };
  } 
  
  case SET_USER_PROJECTS_TASKS: {
      const { currentUserProjectsTasks } = action.data;
      return { ...state, currentUserProjectsTasks };
  } 

  
    default:
      return state
  }
  
} 
