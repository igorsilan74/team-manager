import { 
  ADD_LOCATION, SET_LOCATIONS, CHANGE_LOCATION, REMOVE_LOCATION,
  ADD_SKILL, SET_SKILLS, CHANGE_SKILL, REMOVE_SKILL,
  ADD_SKILL_LEVEL, SET_SKILL_LEVELS, CHANGE_SKILL_LEVEL, REMOVE_SKILL_LEVEL,
  ADD_POSITION, SET_POSITIONS, CHANGE_POSITION, REMOVE_POSITION,
  SET_TOKEN,
  SET_CURRENT_USER,
  SET_ISLOADING
 } from './actionTypes';

const initialState =  {
  auth_token:'',
  isLoading: false,
  locations:[],
  lastLocationId:10,
  skills:[],
  lastSkillId:7,
  skillLevels:[],
  lastSkillLevelId:7,
  positions:[],
  lastPositionId:3
}

//Reducer function
export default (state = initialState, action) => {
  switch (action.type) {
  
    //common  
	case SET_TOKEN: {
      const { auth_token } = action.data;
      return { ...state, auth_token };
    }
	
	
	case SET_ISLOADING: {
	  const { isLoading } = action.data;	
	  return {...state,isLoading} 
	} 
	
	//location
	case ADD_LOCATION: {
        const {data: { name }} = action;
        const id = state.lastLocationId + 1
	    const locations = [
          ...state.locations,{ id, name }
        ];

		return {
          ...state,
          locations,
          lastLocationId: id
        };
    }
	
	case SET_LOCATIONS: {
      const { locations } = action.data;
      return { ...state, locations };
    }

   case CHANGE_LOCATION: {
		const { locations } = state;
		const newLocation = {id:action.data.id, name:action.data.name};
		for(let i = 0; i < locations.length; i++) {
         if(locations[i].id === action.data.id) {
           locations[i]=newLocation;
           break;
        }
       }

	   return { ...state, locations};
  }
  
  case REMOVE_LOCATION: {
    const { locations: oldLocations } = state;
    const { id } = action.data;

    const locations = oldLocations
      .filter(location => location.id !== id);

    return { ...state, locations }
  }
  
  //skillLevels
	case ADD_SKILL_LEVEL: {
        const {data: { name }} = action;
        const id = state.lastSkillLevelId + 1
	    const skillLevels = [
          ...state.skillLevels,{ id, name }
        ];

		return {
          ...state,
          skillLevels,
          lastSkillLevelId: id
        };
    }
	
	case SET_SKILL_LEVELS: {
      const { skillLevels } = action.data;
      return { ...state, skillLevels };
    }

   case CHANGE_SKILL_LEVEL: {
		const { skillLevels } = state;
		const newSkillLevel = {id:action.data.id, name:action.data.name};
		for(let i = 0; i < skillLevels.length; i++) {
         if(skillLevels[i].id === action.data.id) {
           skillLevels[i]=newSkillLevel;
           break;
        }
       }

	   return { ...state, skillLevels};
  }
  
  
  case REMOVE_SKILL_LEVEL: {
    const { skillLevels: oldSkillLevels } = state;
    const { id } = action.data;

    const skillLevels = oldSkillLevels
      .filter(skillLevel => skillLevel.id !== id);

    return { ...state, skillLevels }
  }
  
  //skills
  
 	case ADD_SKILL: {
        const {data: { name }} = action;
        const id = state.lastSkillId + 1
	    const skills = [
          ...state.skills,{ id, name }
        ];

		return {
          ...state,
          skills,
          lastSkillId: id
        };
    }
	
	case SET_SKILLS: {
      const { skills } = action.data;
      return { ...state, skills };
    }

   case CHANGE_SKILL: {
		const { skills } = state;
		const newSkill = {id:action.data.id, name:action.data.name};
		for(let i = 0; i < skills.length; i++) {
         if(skills[i].id === action.data.id) {
           skills[i]=newSkill;
           break;
        }
       }

	   return { ...state, skills};
  }
  
  case REMOVE_SKILL: {
    const { skills: oldSkills } = state;
    const { id } = action.data;

    const skills = oldSkills
      .filter(skill => skill.id !== id);

    return { ...state, skills }
  }
   
  //positions
  
 	case ADD_POSITION: {
        const {data: { name }} = action;
        const id = state.lastPositionId + 1
	    const positions = [
          ...state.positions,{ id, name }
        ];

		return {
          ...state,
          positions,
          lastPositionId: id
        };
    }
	
	case SET_POSITIONS: {
      const { positions } = action.data;
      return { ...state, positions };
    }

   case CHANGE_POSITION: {
		const { positions } = state;
		const newPosition = {id:action.data.id, name:action.data.name};
		for(let i = 0; i < positions.length; i++) {
         if(positions[i].id === action.data.id) {
           positions[i]=newPosition;
           break;
        }
       }

	   return { ...state, positions};
  }
  
  case REMOVE_POSITION: {
    const { positions: oldPositions } = state;
    const { id } = action.data;

    const positions = oldPositions
      .filter(position => position.id !== id);

    return { ...state, positions }
  }
  
  
    default:
      return state
  }
}
