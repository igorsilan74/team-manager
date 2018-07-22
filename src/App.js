import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm.component';
import UserForm from './components/UserForm/UserForm.component';
import TaskForm from './components/TaskForm/TaskForm.component';
import EmployeeList from './components/EmployeeList/EmployeeList.component';
import ProjectForm from './components/ProjectForm/ProjectForm.component';
import ProjectList from './components/ProjectList/ProjectList.component';
import ProjectTasksForm from './components/ProjectTasksForm/ProjectTasksForm.component';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';


import {
	signin,
	signout,
	setCurrentUserData,
	setUserSkill,
	setUserSkillLevel,
	setAvatar,
	setHistory
	
} from './redux/actions';	

class App extends Component {
	
	constructor(props) {
      super(props);
	  this.checkAuth();
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
	    const { dispatch, history } = this.props;
		const authData = {
						 email,
						 password
		};
	    dispatch(signin(authData,history));
    }
	
	onSignout = () => {
		const { dispatch, history } = this.props;
	    dispatch(signout());
    }
	
	onSkillChange = (skillId,skillName) => {
		const { dispatch, currentUser } = this.props;
	    dispatch(setUserSkill(currentUser,skillId,skillName));
    }
	
	onSkillLevelChange = (skillLevelId,skillLevelName) => {
		const { dispatch, currentUser } = this.props;
	    dispatch(setUserSkillLevel(currentUser,skillLevelId,skillLevelName));
    }
	
	onAvatarChange = (imgData) => {
		const { dispatch, currentUser } = this.props;
	    dispatch(setAvatar(currentUser,imgData));
    }
	
	changeToLoggedUser = () => {
    	const { dispatch, loggedUser } = this.props;
    	dispatch(setCurrentUserData(loggedUser.id));
    }
	
    componentDidMount() {
		const { dispatch, history } = this.props;
		dispatch(setHistory(history));
    }
  
    renderLoginForm = () =>
    <div className="App-form-area">
      <div className="form-wrapper">
        <LoginForm
          onSignin={this.onSignin}
        />
      </div>
    </div>
	
	renderUserForm = () => {
	const { auth_token, currentUser } = this.props;

	return (
	
	<div className="App-form-area">
      <div className="form-wrapper">
	  { 
	  ((auth_token)&&(currentUser))
	  ?	<UserForm
		   onSkillChange={this.onSkillChange}
		   onSkillLevelChange={this.onSkillLevelChange}
		   onAvatarChange={this.onAvatarChange}
        />
	  : null
      }
      </div>
    </div>
	);
	}


	renderProjectForm = () => {
	const { auth_token } = this.props;
	
	return (
	
	<div className="App-form-area">
      <div className="form-wrapper">
	  { 
	  (auth_token)
	  ?	<ProjectForm
        />
	  : null
      }
      </div>
    </div>
	);
	}

	
	renderEmployeeList = () => {
	return (	
    <div className="App-form-area">
      <div className="form-wrapper">
        <EmployeeList
        />
      </div>
    </div>
    );
	}
	
	renderProjectList = () => {
	return (	
    <div className="App-form-area">
      <div className="form-wrapper">
        <ProjectList
        />
      </div>
    </div>
    );
	}
	
	renderTasksForm = () => {
	return (
	<div className="App-form-area">
      <div className="form-wrapper">
	  <ProjectTasksForm
      />
      </div>
    </div>
	);
	}
	
	renderTaskForm = () => {
	return (
	<div className="App-form-area">
      <div className="form-wrapper">
	  <TaskForm
      />
      </div>
    </div>
	);
	}

	
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
				<div className="col-md-2">
				 <Link
				  className="link--route"
				  to="/employees"
				 >
				<strong>Employees</strong>         
				</Link>
				</div>
				<div className="col-md-6"></div>
				<div className="col-md-1">
				<Link
				  className="link--route"
				  to={"/employee/"+this.props.loggedUser.id}
				  onClick={() => this.changeToLoggedUser()}
				 >
				{this.props.loggedUser.name}
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
            }/>
			
            <Route path='/login' render={this.renderLoginForm} />
			<Route path='/logout' />
			<Route path='/employee/'  render={this.renderUserForm} />
			<Route exact path='/employees'  render={this.renderEmployeeList} />
			<Route path='/project/'  render={this.renderProjectForm} />
			<Route exact path='/projects'  render={this.renderProjectList} />
			<Route path='/task/'  render={this.renderTaskForm} />
			<Route exact path='/tasks'  render={this.renderTasksForm} />
			
          </Switch>
   	
		
      </div>
    );
  }
}


const mapStateToProps = state => {
	
    const {
		auth_token,
		isLoading
	} = state.common;
	 
    const {
		currentUser,
		loggedUser
	} = state.employee;
	 
	 
    return {
    	auth_token,
		isLoading,
		currentUser,
		loggedUser
    };
}

export default DragDropContext(HTML5Backend)(withRouter(connect(mapStateToProps)(App)));