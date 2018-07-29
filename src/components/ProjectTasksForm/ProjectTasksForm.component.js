import React, { Component } from 'react';
import './ProjectTasksForm.component.css';
import { Link } from 'react-router-dom';
import { formatDate, modalEditProject, modalEditTask } from '../../utils';
import { connect } from 'react-redux';
import { List } from "react-virtualized";
import { DropTarget } from 'react-dnd';
import TaskTarget from '../TaskTarget/TaskTarget.component';
import   { saveProject, setProjectTasksStore } from '../../redux/actionsProjects';
import   { saveTask, addTask } from '../../redux/actionsTasks';
import { modalForm } from '../../utils';

class ProjectTasksForm extends Component {

  constructor(props) {
    super(props);
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
  document.getElementById('project-name').value=currentProject.name;
  document.getElementById('project-description').value=currentProject.description;
  modalForm('editProjectModal',true);
}	 


projectEditCloseAndSave = () => {
  const { dispatch,currentProject } = this.props;

  const changedProject={
    ...currentProject,
    name:document.getElementById('project-name').value,
    description:document.getElementById('project-description').value
  };

  dispatch(saveProject(changedProject));
  modalForm('editProjectModal',false);

}


taskEditShow = () => {
  document.getElementById('task-name').value='';
  document.getElementById('task-description').value='';
  modalForm('editTaskModal',true);
}	 


taskEditCloseAndSave = () => {
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

modalBody() {
  const { employees } = this.props;
  return (	
    <select id="employee-select" >
      {employees.map( (employee,index) => {
        return  <option key={index} value={employee.id} >{employee.name+' '+employee.surName}</option>
      }
      )}
    </select>
  );			
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

      {modalEditProject(this.projectEditCloseAndSave)}
      {modalEditTask(this.taskEditCloseAndSave,this.modalBody())}	

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
