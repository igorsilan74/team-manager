import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm.component';
import UserForm from './components/UserForm/UserForm.component';
import TaskForm from './components/TaskForm/TaskForm.component';
import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import {
	signin,
	signout,
	setCurrentUserData,
	setUserSkillApi,
	setUserSkillLevelApi,
	setAvatarApi
} from './redux/actions';	

class App extends Component {
	
	constructor(props) {
      super(props);
	  this.checkAuth();
	  this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
   } 
   
  forceUpdateHandler = () => {
    this.forceUpdate();
  }
  	
	checkAuth = () => {
		const { history } = this.props;
		//for change history
		history.listen((location,action) => {
		   const { auth_token } = this.props;
		   if ((! location.pathname.toUpperCase().includes('LOGIN'))&&(auth_token.length===0)) { 
			  history.push('/login');
		   }
		});
		//for typing in adress bar
		const historySync = syncHistoryWithStore(createBrowserHistory(), this.props.store);
		historySync.listen(() => {
		   const { auth_token } = this.props;
		   if ((! location.pathname.toUpperCase().includes('LOGIN'))&&(auth_token.length===0)) { 
			  history.push('/login');
		   }
		});
    }
	
	onSignin = (email, password) => {
	    const { dispatch } = this.props;
		const authData = {
						 email,
						 password
		};
	    dispatch(signin(authData));
    }
	
	onSignout = () => {
		const { dispatch, history } = this.props;
	    dispatch(signout());
    }
	
	onSkillChange = (skillId,skillName) => {
		const { dispatch, history, currentUser, auth_token } = this.props;
	    dispatch(setUserSkillApi(currentUser,skillId,skillName,auth_token));
    }
	
	onSkillLevelChange = (skillLevelId,skillLevelName) => {
		const { dispatch, history, currentUser, auth_token } = this.props;
	    dispatch(setUserSkillLevelApi(currentUser,skillLevelId,skillLevelName,auth_token));
    }
	
	onAvatarChange = (imgData) => {
		const { dispatch, history, currentUser, auth_token } = this.props;
	    dispatch(setAvatarApi(currentUser,imgData,auth_token));
    }
	
    componentDidMount() {
	  const { auth_token, currentUser, dispatch } = this.props;
    }
  
  
    componentDidUpdate(prevProps, prevState) {
	   const { auth_token, history, currentUser, dispatch } = this.props;
	   
	   //check auth token for login page
	   if (location.pathname.toUpperCase().includes('LOGIN')) {
	     if (auth_token.length!==0) {
			 if (auth_token.toUpperCase().includes('LOGIN_ERROR')) {
				document.querySelector('#error-login--message').classList.remove('error-login--hide'); 
			 } else {
				 if (auth_token!==prevProps.auth_token) {
				      if (!((Object.keys(currentUser).length === 0) && (currentUser.constructor === Object))) {
						dispatch(setCurrentUserData(currentUser.id,auth_token));
						history.push('/user');
					  }
					  
				 }
			 }
	     } 
	   }
	   
    }
  
  
  
    renderLoginForm = () =>
    <div className="App-form-area">
      <div className="form-wrapper">
        <LoginForm
           onSignin={this.onSignin}
		   history={this.props.history}
        />
      </div>
    </div>
	
	renderUserForm = () => {

	return (
	
	<div className="App-form-area">
      <div className="form-wrapper">
	  
		<UserForm
		   history={this.props.history}
		   currentUser={this.props.currentUser}
		   currentUserProjects={this.props.currentUserProjects}
		   currentUserTasks={this.props.currentUserTasks}
		   currentUserProjectsTasks={this.props.currentUserProjectsTasks}
		   skillLevels={this.props.skillLevels}
		   skills={this.props.skills}
		   onSkillChange={this.onSkillChange}
		   onSkillLevelChange={this.onSkillLevelChange}
        />
	  
      </div>
    </div>
	);
	}
	
	renderTaskForm = () =>
    <div className="App-form-area">
      <div className="form-wrapper">
	  
        <TaskForm
		   history={this.props.history}
		   currentUser={this.props.currentUser}
		   currentTask={this.props.currentTask}
        />
      </div>
    </div>
	
  render() {
	  
	const { auth_token } = this.props;
	
	
    return (
      <div className="App">
	  
	  {
		((auth_token.length!==0)&&(!auth_token.toUpperCase().includes('LOGIN_ERROR'))) 
        ? <div>
		<header className="App-header">
		<div id="app-header-container" className="container">
			<div className="row">
				<div className="col-md-2">
				 <Link
				   className="link--route"
				   to="/projects"
				 >
				 <strong>Projects</strong>         
				</Link>
				</div>
				<div className="col-md-1">
				 <Link
				   className="link--route"
				   to="/employees"
				 >
				 <strong>Employees</strong>         
				</Link>
				</div>
				<div className="col-md-7"></div>
				<div className="col-md-1">
				<Link
				   className="link--route"
				   to={"/user/"+this.props.currentUser.id}
				 >
				{this.props.currentUser.name}
				</Link>
				</div>
				<div className="col-md-1">
				 <Link
				   onClick={this.onSignout}
				   className="link--route"
				   to="/login"
				   id="logout-link"
				 >
				 Logout         
				</Link>
				</div>
		        
			</div>
		</div>	
		<hr></hr>
		</header>
		</div>
        : null
      }
	    
          <Switch>
		    
            <Route exact path='/' render={() =>
              <div>
			  Welcome to task manager.
			  <Link
              className="link--route"
              to="/login"
              >
			  Login
			  </Link>
              </div>
            } />
			
            <Route path='/login' render={this.renderLoginForm} />
			<Route path='/logout' />
			<Route path='/user'  render={this.renderUserForm} />
			<Route path='/task'  render={this.renderTaskForm} />
			
          </Switch>
   	
		
      </div>
    );
  }
}


const mapStateToProps = state => {
	
    const {
			auth_token,
			isLoading,
			locations,
			lastLocationId,
			skills,
			lastSkillId,
			skillLevels,
			lastSkillLevelId,
			positions,
			lastPositionId
	      } = state.common;
	 
   const {
			employees,
			lastEmployeeId,
			currentUser,
			currentUserProjects,
			currentUserTasks,
			currentUserProjectsTasks
	 } = state.employee;
	 
   const {
	  tasks,
	  lastTaskId
	 } = state.tasks;
	 
   const {
	  projects,
	  lastProjectId
	 } = state.projects; 
	 
	 
 return {
       auth_token,
	   currentUser,
	   currentUserProjects,
	   currentUserTasks,
	   currentUserProjectsTasks,
	   isLoading,
	   employees,
	   lastEmployeeId,
	   tasks,
	   lastTaskId,
	   projects,
	   lastProjectId,
	   locations,
	   lastLocationId,
	   skills,
	   lastSkillId,
	   skillLevels,
	   lastSkillLevelId,
	   positions,
	   lastPositionId
};
}

export default withRouter(connect(mapStateToProps)(App));
