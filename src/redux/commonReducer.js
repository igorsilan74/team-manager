import { 
  ADD_LOCATION, SET_LOCATIONS, CHANGE_LOCATION, REMOVE_LOCATION,
  ADD_SKILL, SET_SKILLS, CHANGE_SKILL, REMOVE_SKILL,
  ADD_SKILL_LEVEL, SET_SKILL_LEVELS, CHANGE_SKILL_LEVEL, REMOVE_SKILL_LEVEL,
  ADD_POSITION, SET_POSITIONS, CHANGE_POSITION, REMOVE_POSITION,
  SET_TOKEN,
  SET_CURRENT_USER,
  SET_ISLOADING,
  SET_HISTORY,
  LOAD,
  REQUEST_FAIL
} from './actionTypes';

const initialState =  {
  auth_token:'',
  isLoading: false,
  locations:[],
  skills:[],
  skillLevels:[],
  positions:[],
  currentHistory:null
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

  case LOAD: {
    return state; 
  }

  case REQUEST_FAIL: {
    return state; 
  }

  case SET_HISTORY: {
    const { history } = action.data;
    return { ...state, currentHistory:history };
  }

  //location

  case SET_LOCATIONS: {
    if (!action.payload.data) {
      return state;
    }			
    const { data:locations } = action.payload;
    return { ...state, locations };
  }

  //skillLevels

  case SET_SKILL_LEVELS: {
    if (!action.payload.data) {
      return state;
    }
    const { data:skillLevels } = action.payload;
    return { ...state, skillLevels };
  }

  //skills

  case SET_SKILLS: {
    if (!action.payload.data) {
      return state;
    }
    const { data:skills } = action.payload;
    return { ...state, skills };
  }

  //positions

  case SET_POSITIONS: {
    if (!action.payload.data) {
      return state;
    }		
    const { data:positions } = action.payload;
    return { ...state, positions };
  }

  default:
    return state
  }
}
