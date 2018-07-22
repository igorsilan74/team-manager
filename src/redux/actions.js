import { 
	SET_TOKEN,
	SET_CURRENT_USER,
	SET_ISLOADING,
	SET_USER_PROJECTS,
	SET_USER_TASKS,
	SET_SKILL_LEVELS,
	SET_SKILLS,
	CHANGE_USER_SKILL,
	CHANGE_USER_SKILL_LEVEL,
	CHANGE_USER_AVATAR,
	SET_HISTORY,
	SET_LOGGED_USER,
	SET_CURRENT_PROJECT,
	SET_PROJECT_TASKS_STORE,
	SET_CURRENT_TASK,
	DELETE_EMPLOYEE_STORE,
	DELETE_PROJECT_STORE
} from './actionTypes';
		 
import axios from 'axios';
import { 
	authUrl,
	employeesUrl,
	employeeUrl,
	employeeProjectsUrl,
	employeeTasksUrl,
	skillLevelsUrl,
	skillsUrl,
	positionsUrl,
	locationsUrl,
	projectEmployeesUrl,
	projectTasksUrl,
	projectsUrl,
	tasksUrl,
	projectUrl,
	projectEmployeeUrl,
	taskUrl
} from '../urls';
		
//////////////////////////////common//////////////////////////////
		
export const signin = (authData,history) => dispatch => {
    axios.post(authUrl(),authData)
    .then(({ data }) => {
	  dispatch(setToken(data.token));
	  dispatch(setCurrentUser(data.user));
	  dispatch(setLoggedUser(data.user));
	  dispatch(setCurrentUserData(data.user.id,true));
	  dispatch(setCommonData());
	  
	  history.push('/employee/'+data.user.id);
    })
	.catch(error => {
       document.querySelector('#error-login--message').classList.remove('error-login--hide'); 
	   dispatch(setToken('login_error'));
   });
	
};


export const signout = () => dispatch => {
	dispatch(setToken(''));
};

export const setCommonData = () => dispatch => {
	dispatch(setSkillLevels());
	dispatch(setSkills());
	dispatch(setPositions());
	dispatch(setLocations());
}   

const setSkillLevels = () => { 
   return {
	types: ['LOAD','SET_SKILL_LEVELS','REQUEST_FAIL'],
    payload: {
      request:  { 
		url: skillLevelsUrl(), 
		method: 'get'
     }
    }
   }
}

const setSkills = () => { 
    return {
	types: ['LOAD','SET_SKILLS','REQUEST_FAIL'],
    payload: {
      request:  { 
		url: skillsUrl(), 
		method: 'get'
     }
    }
   }
}

const setPositions = () => { 
    return {
	types: ['LOAD','SET_POSITIONS','REQUEST_FAIL'],
    payload: {
      request:  { 
		url: positionsUrl(), 
		method: 'get'
     }
    }
   }
}

const setLocations = () => { 
    return {
	types: ['LOAD','SET_LOCATIONS','REQUEST_FAIL'],
    payload: {
      request:  { 
		url: locationsUrl(), 
		method: 'get'
     }
    }
   }
}


const setToken = (token) => ({
	type: SET_TOKEN,
	data:{
		auth_token:token
	}
});


const setIsLoading = (isLoading) => ({
	type: SET_ISLOADING,
	data:{
		isLoading
	}	
});


export const setHistory = (history) => ({
	type: SET_HISTORY,
	data:{
		history
	}	
});


export const redirectToLogin = (history) => dispatch => {
	dispatch(setToken(''));
	history.push('/login');
};

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

export const setAvatar = (currentUser,avatar) => {
   const newUser={...currentUser,avatar};
   
   return {
	types: ['LOAD','CHANGE_USER_AVATAR','REQUEST_FAIL'],
    payload: {
      request:  {
		url: employeeUrl(currentUser.id), 
		method: 'put',
		data:newUser
     }
    }
   }
}


//////////////////////////////employee//////////////////////////////

export const setCurrentUserData = (id,isUserLoaded) => dispatch => {
	if (!isUserLoaded) {
	  dispatch(loadEmployee(id));
	}
	dispatch(setUserProjects(id));
    dispatch(setUserTasks(id));
}   


const setUserTasks = (id) => {
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


const setUserProjects = (id) => { 
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

const setLoggedUser = (user) => ({
	type: SET_LOGGED_USER,
	data:{
		loggedUser:user
	}
});

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

//////////////////////////////projects//////////////////////////////

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

//////////tasks//////////

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
