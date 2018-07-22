import React, { Component } from 'react';
import './ProjectTasksForm.component.css';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';
import { connect } from 'react-redux';
import { List } from "react-virtualized";
import { DropTarget } from 'react-dnd';
import TaskTarget from '../TaskTarget/TaskTarget.component';
import   { saveTask, setProjectTasksStore, saveProject, addTask } from '../../redux/actions';
import { modalForm } from '../../utils';

class ProjectTasksForm extends Component {

	constructor(props) {
    	super(props);
    	this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
		
		this.projectEditShow = this.projectEditShow.bind(this);
		this.projectEditClose = this.projectEditClose.bind(this);
		this.projectEditCloseAndSave = this.projectEditCloseAndSave.bind(this);
		
		this.taskEditShow = this.taskEditShow.bind(this);
		this.taskEditClose = this.taskEditClose.bind(this);
		this.taskEditCloseAndSave = this.taskEditCloseAndSave.bind(this);		
    }

	
	forceUpdateHandler = () => {
      this.forceUpdate();
	}

	
	onDrop = (newTask) => {
	  const {  dispatch, currentProjectTasks } = this.props;
	   dispatch(saveTask(newTask));
       dispatch(setProjectTasksStore(currentProjectTasks,newTask)); 
	   this.forceUpdateHandler();
	}  
  
  
	projectEditShow() {
	  const { currentProject } = this.props;
	  document.getElementById('project-name').value=currentProject.name;
	  document.getElementById('project-description').value=currentProject.description;
	  modalForm('editProjectModal',true);
	}	 

	
	projectEditClose() {
	  modalForm('editProjectModal',false);
	}
  
  
	projectEditCloseAndSave() {
      const { dispatch,currentProject } = this.props;
	
	  const changedProject={
	    ...currentProject,
		name:document.getElementById('project-name').value,
		description:document.getElementById('project-description').value
	  };
	
	  dispatch(saveProject(changedProject));
 	  modalForm('editProjectModal',false);

	}
  
  
	taskEditShow() {
	  document.getElementById('task-name').value='';
	  document.getElementById('task-description').value='';
	  modalForm('editTaskModal',true);
	}	 
  
  
	taskEditClose() {
	  modalForm('editTaskModal',false);
	}

	
	taskEditCloseAndSave() {
      const { dispatch,currentProject } = this.props;
	
	  const employeeSelect = document.getElementById('employee-select');
			
	  const newTask={
	    employeeId: employeeSelect.value,
		employeeName:employeeSelect.options[employeeSelect.selectedIndex].innerHTML,
		projectId: currentProject.id,
        projectName: currentProject.name,
		name:document.getElementById('task-name').value,
		description:document.getElementById('task-description').value,
		statusId:0,
        statusName:'Todo'
	  };
	
	  dispatch(addTask(newTask));
	  this.forceUpdateHandler();
 	  modalForm('editTaskModal',false);
	}
		

	render() {
      const { currentProject, currentProjectTasks, dispatch, employees } = this.props;

      let todos=[];
      let progress=[];
      let test=[];
      let done=[];
   
      if (currentProjectTasks.length>0) {
       todos=currentProjectTasks.filter( task => (task.statusId===0));
       progress=currentProjectTasks.filter( task => (task.statusId===1));
	   test=currentProjectTasks.filter( task => (task.statusId===2));
	   done=currentProjectTasks.filter( task => (task.statusId===3));	 
      }

      const formattedCreationDate=formatDate(currentProject.creationDate);  

	  return (
	  
	    <div>

		  {/*modal edit project*/}   
		  <div className="modal fade" id="editProjectModal"  role="dialog" aria-labelledby="editProjectModalLabel" aria-hidden="true">
		  <div className="modal-dialog" role="document">
		  <div className="modal-content">
			<div className="modal-header">
			  <h5 className="modal-title" id="editProjectModalLabel">Edit</h5>
			  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true" onClick={this.projectEditClose}>&times;</span>
			  </button>
			</div>
			<div className="modal-body">
			  <div id="projects-item" className="container">
				  
				<div className="row">
				  <div className="col-md-2">
					<label>Name:</label>
				  </div>
				  <div className="col-md-10">
					<input id="project-name" type="text" placeholder="Enter project name" size="50"></input><br/>
				  </div>
				</div>  

				<div className="row">
				  <div className="col-md-2">
					<label>Description:</label>
				  </div>
				  <div className="col-md-10">
					<input id="project-description" type="text" placeholder="Enter project description" size="50"></input><br/>
				  </div>
				</div>  
				
			  </div> 
			</div>
			<div className="modal-footer">
			  <button id="project-modal-ok" type="button" className="btn btn-primary" onClick={this.projectEditCloseAndSave} >OK</button>
			  <button id="project-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.projectEditClose}>CANCEL</button>
			</div>
		  </div>
		  </div>
		  </div>

		  {/*modal add task*/}   
		  <div className="modal fade" id="editTaskModal"  role="dialog" aria-labelledby="editTaskModalLabel" aria-hidden="true">
		  <div className="modal-dialog" role="document">
		  <div className="modal-content">
			<div className="modal-header">
			  <h5 className="modal-title" id="editTaskModalLabel">Edit</h5>
			  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true" onClick={this.taskEditClose}>&times;</span>
			  </button>
			</div>
			<div className="modal-body">
			  <div id="projects-item" className="container">
					
				<div className="row">
				  <div className="col-md-2">
				    <label>Select an employee:</label>
				  </div>
				  <div className="col-md-10">
					<select id="employee-select" >
					  {employees.map( (employee,index) => {
						return  <option key={index} value={employee.id} >{employee.name+' '+employee.surName}</option>
					  }
					  )}
					</select>
				  </div>
				</div>
					
				<div className="row">
				  <div className="col-md-2">
				    <label>Name:</label>
				  </div>
				  <div className="col-md-10">
				    <input id="task-name" type="text" placeholder="Enter task name" size="50"></input><br/>
				  </div>
				</div>  

				<div className="row">
				  <div className="col-md-2">
				    <label>Description:</label>
				  </div>
				  <div className="col-md-10">
				    <input id="task-description" type="text" placeholder="Enter task description" size="50"></input><br/>
				  </div>
				</div>  
				
			  </div> 
			</div>
			<div className="modal-footer">
			  <button id="project-modal-ok" type="button" className="btn btn-primary" onClick={this.taskEditCloseAndSave} >OK</button>
			  <button id="project-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.taskEditClose}>CANCEL</button>
			</div>
		  </div>
		  </div>
		  </div>

		  
		  <div className="container">

		    <div className="row">
			  <div className="project-tasks-title col-md-3">
				{currentProject.name}
			  </div>
			  <div className="col-md-2">
				{formattedCreationDate}
			  </div>

			  <div className="col-md-2">
				 <button id="btn-edit-project" type="button" className="btn btn-primary btn-sm" onClick={this.projectEditShow}>
					Project edit
				 </button>
			  </div>
			  
			  <div className="col-md-2">
				 <button id="btn-add-task" type="button" className="btn btn-primary btn-sm" onClick={this.taskEditShow}>
					Add new task
				 </button>
			  </div>
			  
			</div>

			<br/>
			
			<div className="row">
			  
			  <div className="task-column col-md-3">
				<div className="task-column-title">
				  Todo
				</div>			
				<TaskTarget
				typeTask={0}
				tasks={todos}
				onDrop={this.onDrop}
				/>
			  </div>

			  <div className="task-column col-md-3">
				<div className="task-column-title">
				  In progress
				</div>			
				<TaskTarget
				typeTask={1}
				tasks={progress}
				onDrop={this.onDrop}
				/>
			  </div>

			  <div className="task-column col-md-3">
				<div className="task-column-title">
				  In test
				</div>			
				<TaskTarget
				typeTask={2}
				tasks={test}
				onDrop={this.onDrop}
				/>
			  </div>

			  <div className="task-column col-md-3">
				<div className="task-column-title">
				  Done
				</div>			
				<TaskTarget
				typeTask={3}
				tasks={done}
				onDrop={this.onDrop}
				/>
			  </div>
				
			</div> 
		  </div>
		  
		</div> 
		 
		);
	
	}
 
}


const mapStateToProps = (state) => {

	const {
		employees
    } = state.employee;
   
	const {
		currentProject,
		currentProjectTasks
	} = state.projects;

	return {
		employees,
		currentProject,
		currentProjectTasks
	};
}


export default connect(mapStateToProps)(ProjectTasksForm);
