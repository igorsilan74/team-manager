import { 
        SET_TOKEN,
		SET_CURRENT_USER,
		SET_ISLOADING,
		SET_USER_PROJECTS,
		SET_USER_TASKS,
		SET_USER_PROJECTS_TASKS,
		SET_SKILL_LEVELS,
		SET_SKILLS,
		CHANGE_USER_SKILL,
		CHANGE_USER_SKILL_LEVEL,
		CHANGE_USER_AVATAR
} from './actionTypes';
		 
import axios from 'axios';
import { authUrl,
		employeesUrl,
		employeeUrl,
		employeeProjectsUrl,
		employeeTasksUrl,
		skillLevelsUrl,
		skillsUrl
		} from '../urls';

export const signin = (authData) => dispatch => {
    axios.post(authUrl(),authData)
    .then(({ data }) => {
	  dispatch(setCurrentUser(data.user));
	  dispatch(setToken(data.token));
    })
	.catch(error => {
       dispatch(setToken('login_error'));
   });
	
};


export const signout = () => dispatch => {
	  dispatch(setToken(''));
	  dispatch(setCurrentUser({}));
	  dispatch(setCurrentUserData(-1,''));
};



const setCurrentUserDataAuth_ = (id) => ({
	type: 'LOAD',
    payload: {
      request:{
        url:employeeProjectsUrl(id)
      }
    }
});


export const setCurrentUserData = (id,token) => dispatch => {
  let currentProjects;
  let currentUserProjectsTasks = [];
  let currentUserProjectsTask={};
  if (id>=0)  {
	//try to set headers to each request - don't work
	//dispatch(setCurrentUserDataAuth_(id));
	//set current user projects
	axios({ method: 'get', url: employeeProjectsUrl(id), headers: { 'authtoken': token,'Content-Type':'application/x-www-form-urlencoded' }})
    .then(({ data }) => {
	 currentProjects=data;
	 dispatch(setUserProjects(data));
	 return axios({ method: 'get', url: employeeTasksUrl(id), headers: { 'authtoken': token,'Content-Type':'application/x-www-form-urlencoded' }});
     })
	 .then(( {data:currentTasks } ) => {
	  dispatch(setUserTasks(currentTasks));
	 
	 if ((currentTasks)&&(currentTasks.length>0)) {
		
		 for (let i=0;i<currentProjects.length;i++) {
			let tasks=currentTasks.filter((task) => { return task.projectId===currentProjects[i].id });
			if (tasks.length>0) {
			  currentUserProjectsTask={
				projectId:currentProjects[i].id,
				projectName:currentProjects[i].name,
				shortName:currentProjects[i].shortName,
				tasks:tasks  
			  };
			  currentUserProjectsTasks.push(currentUserProjectsTask);
			}
		}
	}
	dispatch(setUserProjectsTasks(currentUserProjectsTasks));
   });
  
  //set list of skills and levels
  axios({ method: 'get', url: skillLevelsUrl(), headers: { 'authtoken': token,'Content-Type':'application/x-www-form-urlencoded' }})
    .then(({ data }) => {
    dispatch(setSkillLevels(data));
  });
  
  axios({ method: 'get', url: skillsUrl(), headers: { 'authtoken': token,'Content-Type':'application/x-www-form-urlencoded' }})
    .then(({ data }) => {
    dispatch(setSkills(data));
  });
  
  } else {
	dispatch(setUserProjects([]));
	dispatch(setUserTasks([]));
	dispatch(setUserProjectsTasks([]));
  }
}   
     

//common

const setToken = (token) => ({
	type: SET_TOKEN,
	data:{
		auth_token:token
	}
});

const setCurrentUser = (user) => ({
	type: SET_CURRENT_USER,
	data:{
		currentUser:user
	}
});

const setIsLoading = (isLoading) => ({
	type: SET_ISLOADING,
	data:{
		isLoading
	}	
});

const setUserProjects = (currentUserProjects) => ({
	type: SET_USER_PROJECTS,
	data:{
		currentUserProjects
	}	
});

const setUserTasks = (currentUserTasks) => ({
	type: SET_USER_TASKS,
	data:{
		currentUserTasks
	}	
});

const setUserProjectsTasks = (currentUserProjectsTasks) => ({
	type: SET_USER_PROJECTS_TASKS,
	data:{
		currentUserProjectsTasks
	}	
});

const setSkillLevels = (skillLevels) => ({
	type: SET_SKILL_LEVELS,
	data:{
		skillLevels
	}	
});


const setSkills = (skills) => ({
	type: SET_SKILLS,
	data:{
		skills
	}	
});

export const setUserSkillApi = (currentUser,id,name,token) => dispatch => {
	const newUser={...currentUser,skillId:id};
	axios({ method: 'put', url: employeeUrl(id), headers: { 'authtoken': token,'Content-Type':'application/x-www-form-urlencoded' },
	body:newUser
	})
    .then(() => {
	 dispatch(setUserSkill(id,name));
     });

}

const setUserSkill = (id,name) => ({
	type: CHANGE_USER_SKILL,
	data:{
		id,
		name
	}
});	 

export const setUserSkillLevelApi = (currentUser,id,name,token) => dispatch => {
    const newUser={...currentUser,skillLevelId:id};
	axios({ method: 'put', url: employeeUrl(id), headers: { 'authtoken': token,'Content-Type':'application/x-www-form-urlencoded' },
	body:newUser
	})
    .then(() => {
	 dispatch(setUserSkillLevel(id,name));
     });
}

const setUserSkillLevel = (id,name) => ({
	type: CHANGE_USER_SKILL_LEVEL,
	data:{
		id,
		name
	}
});	

const setAvatar = (avatar) => ({
	type: CHANGE_USER_AVATAR,
	data:{
		avatar
	}
});	

export const setAvatarApi = (currentUser,imgData,token) => dispatch => {
    const newUser={...currentUser,avatar:imgData};
	axios({ method: 'put', url: employeeUrl(currentUser.id), headers: { 'authtoken': token,'Content-Type':'application/x-www-form-urlencoded' },
	body:newUser
	})
    .then(() => {
	 dispatch(setAvatar(imgData));
     });
}
