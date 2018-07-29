import { 
  ADD_EMPLOYEE,
  SET_EMPLOYEES, 
  REMOVE_EMPLOYEE,
  SET_CURRENT_USER,
  SET_USER_PROJECTS,
  SET_USER_TASKS,
  CHANGE_USER_SKILL,
  CHANGE_USER_SKILL_LEVEL,
  CHANGE_USER_AVATAR,
  LOAD_EMPLOYEE,
  SET_LOGGED_USER,
  DELETE_EMPLOYEE_STORE
} from './actionTypes';

const initialState =  {
  employees:[],
  currentUser:{},
  loggedUser:{},
  currentUserProjects:[],
  currentUserTasks:[],
  currentUserProjectsTasks:[]
}

//Reducer function
export default (state = initialState, action) => {
  switch (action.type) {

  case ADD_EMPLOYEE: {
    if (!action.payload.data) {
      return state;
    }

    const { data:currentUser } = action.payload;
    return { ...state, currentUser };
  }


  case SET_EMPLOYEES: {
    if (!action.payload.data) {
      return state;
    }
    const { data:employees } = action.payload;
    return { ...state, employees };
  }


  case CHANGE_USER_SKILL: {
    if (!action.payload.data) {
      return state;
    }

    const { currentUser } = state;
    const newDataEmployee = action.payload.data
      .filter(employee => parseInt(employee.id) === parseInt(currentUser.id));
    const newSkill={
      id:newDataEmployee[0].skill.id,
      name:newDataEmployee[0].skill.name
    };

    const newCurrentUser = {...currentUser,skill:newSkill};
    newCurrentUser.skillId = parseInt(newDataEmployee[0].skill.id);

    return { ...state, currentUser:newCurrentUser};
  }


  case CHANGE_USER_SKILL_LEVEL: {
    if (!action.payload.data) {
      return state;
    }

    const { currentUser } = state;
    const newDataEmployee = action.payload.data
      .filter(employee => parseInt(employee.id) === parseInt(currentUser.id));
    const newSkillLevel={
      id:newDataEmployee[0].skillLevel.id,
      name:newDataEmployee[0].skillLevel.name
    };

    const newCurrentUser = {...currentUser,skillLevel:newSkillLevel};
    newCurrentUser.skillLevelId = parseInt(newDataEmployee[0].skillLevel.id);

    return { ...state, currentUser:newCurrentUser};
  }


  case CHANGE_USER_AVATAR: {
    if (!action.payload.data) {
      return state;
    }
    const { currentUser } = state;
    const newDataEmployee = action.payload.data
      .filter(employee => parseInt(employee.id) === parseInt(currentUser.id));

    const newCurrentUser = {...currentUser,avatar:newDataEmployee[0].avatar};

    return { ...state, currentUser:newCurrentUser};

  }


  case LOAD_EMPLOYEE: {
    if (!action.payload.data) {
      return state;
    }

    const { data:currentUser } = action.payload;
    return { ...state, currentUser };
  }


  case SET_CURRENT_USER: {
    const { currentUser } = action.data;
    return { ...state, currentUser };
  }	


  case SET_LOGGED_USER: {
    const { loggedUser } = action.data;
    return { ...state, loggedUser };
  }	


  case SET_USER_PROJECTS: {
    if (!action.payload.data) {
      return state;
    }
    const { data:currentUserProjects } = action.payload;
    return { ...state, currentUserProjects };
  } 

  case SET_USER_TASKS: {
    if (!action.payload.data) {
      return state;
    }
    const { data:currentUserTasks } = action.payload;
    return { ...state, currentUserTasks };
  } 

  case DELETE_EMPLOYEE_STORE: {
    const { id } = action.data;
    const employees = [...state.employees];

    if (employees.length>0) {
      for (let i=0;i<employees.length;i++) {
        if (employees[i].id===id) {
          employees.splice(i,1);
          break;
        }
      }
    }

    return { ...state, employees };
  }

  default:
    return state
  }

} 
