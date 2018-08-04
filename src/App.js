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
import './layout.css';
import { withRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import {
  signin,
  signout,
  setAvatar,
  setHistory,
} from './redux/actionsCommon';	

import {
  setCurrentUserData,
  setUserSkillLevel,
  setUserSkill,
} from './redux/actionsEmployee';	


class App extends Component {
	
  constructor(props) {
    super(props);
    this.checkAuth();
  } 
   
  forceUpdateHandler = () => {
    this.forceUpdate();
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
  
  
  checkAuth = () => {
    const { history } = this.props;
  
    //for change history
    history.listen((location,action) => {
      const { auth_token } = this.props;
      if ((! location.pathname.toUpperCase().includes('LOGIN'))&&(!this.checkToken())) { 
        history.push('/login');
      }

      if ((location.pathname.toUpperCase().includes('LOGIN'))&&(this.checkToken())) { 
        this.onSignout();
	    this.forceUpdateHandler();
      }
    });

    //for typing in adress bar
    const historySync = syncHistoryWithStore(createBrowserHistory(), this.props.store);
    historySync.listen(() => {
      const { auth_token } = this.props;
      if ((! location.pathname.toUpperCase().includes('LOGIN'))&&(!this.checkToken())) { 
        history.push('/login');
      }
	  
      if ((location.pathname.toUpperCase().includes('LOGIN'))&&(this.checkToken())) { 
        this.onSignout();
	    this.forceUpdateHandler();
      }

    });
  }


  renderLoginForm = () => {
    const { auth_token } = this.props;

    return (
      <div className="App-form-area">
        <div className="form-wrapper">
          <LoginForm
            onSignin={this.onSignin}
          />
        </div>
      </div>
    )
  }

  renderUserForm = () => {
    const { auth_token, currentUser } = this.props;

    return (

      <div className="App-form-area">
        <div className="form-wrapper">
          { 
            ((auth_token)&&(currentUser)) ?
              <UserForm
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

  checkToken = ()  => {
    const { auth_token } = this.props;
    const auth= ((auth_token)&&(auth_token.length!==0)
	  &&(!auth_token.toUpperCase().includes('LOGIN_ERROR')))  ? true  : false;
    return auth;
  }

  renderProjectForm = () => {
    const { auth_token } = this.props;

    return (

      <div className="App-form-area">
        <div className="form-wrapper">
          { 
            (auth_token) ?
              <ProjectForm
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


renderHeader = () => {


  return (
    <div>
      <header className="App-header">
        <div id="app-header-container" className="container">
          <div className="row user-header">
            <div className="logo-block col-md-1">
              <img id="logo-app" alt="logo" src="/img/jira.png"></img>
            </div>
            <div className="col-md-9"></div>
            <div className="col-md-1">
              <Link
                className="link--header"
                to={"/employee/"+this.props.loggedUser.id}
                onClick={() => this.changeToLoggedUser()}
              >
                {this.props.loggedUser.name}
              </Link>
            </div>
            <div className="col-md-1">
              <Link
                onClick={this.onSignout}
                className="link--header"
                to="/login"
                id="logout-link"
              >
                Logout         
              </Link>
            </div>
     
          </div>
		  
          <div className="row navigation-header">
            <div className="col-md-1"></div>
            <div className="col-md-1">
              <Link
                className="link--header"
                to="/projects"
              >
                <span className="navigation-text">Projects</span>         
              </Link>
            </div>
            <div className="col-md-1">
              <Link
                className="link--header"
                to="/employees"
              >
                <span className="navigation-text">Employees</span>         
              </Link>
            </div>
            <div className="col-md-7"></div>
     
          </div>
		  
		  
        </div>	

      </header>
    </div>
    
   
  );
}

renderLeftMenu = () => {

  return (
    <div id="app-menu"  className="container">
      <div className="row app-menu-row">
        <div className="panel-img col-md-1">
		  <Link
            className="link--header"
            to={"/employees/"}
            onClick={() => this.changeToLoggedUser()}
          >
            <img alt="employee" src="/img/search.png" title="employees"></img>
          </Link>
          
        </div>
      </div>

      <div className="row app-menu-row">
        <div className="panel-img col-md-1">
		  <Link
            className="link--header"
            to={"/projects/"}
            onClick={() => this.changeToLoggedUser()}
          >
            <img alt="projects" src="/img/suitcase.png" title="projects"></img>
          </Link>		
		
          
        </div>
      </div>

    </div>
  );
}		

renderMainContent = () => {


  return (
    <div id="main-content">	  
      <Switch>

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


renderFooter = () => {

  return (
    <div id="footer">
	Bug tracking and project tracking for software development powered by Atlassian JIRA (v4.4#649-r158309) | Report a problem
    </div>
    
  );
}		


render() {

  return (
    <div id="app-content" className="App">

	  <Switch>
        <Route path='/login' render={this.renderLoginForm} />
      </Switch>
	
      {
	    this.checkToken() ?
	      <div className="content--wrapper">

	  	    {this.renderHeader()}

            <div className="main--block">
              <div className="main--wrapper"> 
	            {this.renderLeftMenu()}
	            {this.renderMainContent()}
                <div id="clear"></div>
	          </div>
            </div>
	  
	        {this.renderFooter()}
	      
		  </div>
	      : null
      }
	  
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