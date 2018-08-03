import React, { Component } from 'react';
import './ProjectTasksForm.component.css';
import { Link } from 'react-router-dom';
import { formatDate, modalEditProject, modalEditTask } from '../../utils';
import { connect } from 'react-redux';
import { List } from "react-virtualized";
import { DropTarget } from 'react-dnd';
import TaskTarget from '../TaskTarget/TaskTarget.component';
import   { saveProject, setProjectTasksStore, updateProjectStore, loadProject } from '../../redux/actionsProjects';
import   { saveTask, addTask } from '../../redux/actionsTasks';
import { modalForm } from '../../utils';

class ProjectTasksForm extends Component {

  constructor(props) {
    super(props);
	
    this.state = {
	  
	  projectForm: {
	    projectName:'',
        description:'',
        creationDate:new Date()
	  },
	  
	  taskForm: {
	    taskName:'',
        taskDescription:'',
        employeeId:-1,
        employeeName:''
	  }
	  
    }
	
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


projectEditShow = () => {
  const { currentProject } = this.props;	
  
  this.setState( prevState => ({
    projectForm: {
      ...prevState.projectForm,
      projectName: currentProject.name,
      description: currentProject.description,
      creationDate: new Date(currentProject.creationDate) 
    }
  }));
  
  this.forceUpdateHandler();	
	
  modalForm('editProjectModal',true);
}	 


projectEditCloseAndSave = () => {
  const { dispatch,currentProject } = this.props;
  const isoDate=new Date(this.state.projectForm.creationDate).toISOString();
  
  const changedProject={
    ...currentProject,
    name:this.state.projectForm.projectName,
    description:this.state.projectForm.description,
    creationDate:isoDate
  };

  dispatch(updateProjectStore(changedProject));	
  dispatch(saveProject(changedProject));
  dispatch(loadProject(changedProject.id));
  
  this.forceUpdateHandler();
  modalForm('editProjectModal',false);

}

handleChangeProjectForm = e => {
  const { name, value } = e.target;
  this.setState( prevState => ({
    projectForm: {
      ...prevState.projectForm,
      [name]: value,
    }
  }));

};

handleChangeTaskForm = e => {
  const { name, value } = e.target;
	
  this.setState( prevState => ({
    taskForm: {
      ...prevState.taskForm,
      [name]: value,
    }
  }));

};


taskEditShow = () => {
  
  this.setState( prevState => ({
    taskForm: {
      ...prevState.taskForm,
      taskName: '',
      taskDescription: '',
      employeeId: -1,
      employeeName: ''
    }
  }));
  
  this.forceUpdateHandler();
  modalForm('editTaskModal',true);
}	 


taskEditCloseAndSave = () => {
  const { dispatch,currentProject } = this.props;

  const newTask={
    employeeId: this.state.taskForm.employeeId.toString(),
    employeeName:this.state.taskForm.employeeName,
    projectId: currentProject.id.toString(),
    projectName: currentProject.name,
    name:this.state.taskForm.taskName,
    description:this.state.taskForm.taskDescription,
    statusId:0,
    statusName:'Todo'
  };

  dispatch(addTask(newTask));
  this.forceUpdateHandler();
  modalForm('editTaskModal',false);
}


onCreationDateChange = creationDate => {
	
  this.setState( prevState => ({
    projectForm: {
      ...prevState.projectForm,
      creationDate,
    }
  }));
}


componentWillReceiveProps(nextProps) {

  if (!(Object.keys(nextProps.currentProject).length === 0 && nextProps.currentProject.constructor === Object)) {
    this.setState( prevState => ({
      projectForm: {
        ...prevState.projectForm,
        projectName: nextProps.currentProject.name,
        description: nextProps.currentProject.description,
        creationDate: new Date(nextProps.currentProject.creationDate) 
      }
    }));
  }
  this.forceUpdateHandler();
}


handleChangeSelect = e => {
  const { name, value } = e.target;
  const selectedText=e.target.options[e.target.selectedIndex].innerHTML;
  this.setState( prevState => ({
    taskForm: {
      ...prevState.taskForm,
      [name+'Id']: value,
      [name]: selectedText
    }
  }));

};  



modalBody() {
  const { employees } = this.props;
  return (	
    <select name="employeeName" value={this.state.taskForm.employeeId} onChange={this.handleChangeSelect} >
      {employees.map( (employee,index) => {
        return  <option key={index} value={employee.id} >{employee.name+' '+employee.surName}</option>
      }
      )}
    </select>
  );			
}


onCreationDateChange = creationDate => {
	
  this.setState( prevState => ({
    projectForm: {
      ...prevState.projectForm,
      creationDate,
    }
  }));
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
  
  const heightTarget=(currentProjectTasks.length>0) ? currentProjectTasks.length*100 : 350;

  const formattedCreationDate=formatDate(currentProject.creationDate);  

  
  return (

    <div>

	  {modalEditProject(this.projectEditCloseAndSave,this.onCreationDateChange,this.handleChangeProjectForm,this.state.projectForm)}
	  
      {modalEditTask(this.taskEditCloseAndSave,this.handleChangeTaskForm,this.modalBody(),this.state.taskForm)}	

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

          <div className="col-md-3">
            <div className="task-column-title">
              Todo
            </div>			
          </div>

          <div className="col-md-3">
            <div className="task-column-title">
              In progress
            </div>			
          </div>

          <div className="col-md-3">
            <div className="task-column-title">
              In test
            </div>			
          </div>

          <div className="col-md-3">
            <div className="task-column-title">
              Done
            </div>			
          </div>

        </div> 
		
        <br/>
		
        <div className="row todos-content" >

          <div className="task-column col-md-3">
		
            <TaskTarget
              typeTask={0}
              tasks={todos}
              onDrop={this.onDrop}
			  heightTarget={heightTarget}
            />
          </div>

          <div className="task-column col-md-3">
		
            <TaskTarget
              typeTask={1}
              tasks={progress}
              onDrop={this.onDrop}
			  heightTarget={heightTarget}
            />
          </div>

          <div className="task-column col-md-3">
			
            <TaskTarget
              typeTask={2}
              tasks={test}
              onDrop={this.onDrop}
			  heightTarget={heightTarget}
            />
          </div>

          <div className="task-column col-md-3">
		
            <TaskTarget
              typeTask={3}
              tasks={done}
              onDrop={this.onDrop}
			  heightTarget={heightTarget}
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
