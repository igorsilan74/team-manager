import React, { Component } from 'react';
import './TaskForm.component.css';
import { connect } from 'react-redux';

class TaskForm extends Component {

  render() {

    const { currentUser, currentTask  } = this.props;

    return (
	  <div className="container">
	  Detail information:<br/>
	  (current task)
	   <div className="row">
          <div className="col-md-4"></div>
		   <div className="col-md-4 task-form">
            {currentTask.description+' '+currentTask.projectName.substring(0,4)+'-'+currentTask.id.substring(0,4)}
            <br/>
            {currentTask.name}
            <br/>
            {currentTask.employeeName}
          </div>
		  <div className="col-md-4"></div>
	  </div>
	  </div>
    );

  }
}

const mapStateToProps = (state) => {

  const {
    currentUser
  } = state.employee;

  const {
    currentProject
  } = state.projects;

  const {
    currentTask
  } = state.tasks;	 

  return {
    currentUser,
    currentProject,
    currentTask
  };
}


export default connect(mapStateToProps)(TaskForm);