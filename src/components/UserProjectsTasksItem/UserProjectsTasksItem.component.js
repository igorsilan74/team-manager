import React, { Component } from 'react';
import './UserProjectsTasksItem.component.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentTask } from '../../redux/actionsTasks';	

class UserProjectsTasksItem extends Component {

changeCurrentTask = (task) => {
  const { dispatch } = this.props;
  dispatch(setCurrentTask(task));
}  

render() {

  const { id, name, statusName, projectName, task } = this.props;

  return (

    <li className="task-item">
      <div id="projects-tasks-item" className="container">
        <div className="row">
          <div className="col-md-2">
            <Link
              className="link--task"
              to={'/task/'+id}
              onClick={() => this.changeCurrentTask(task)}
            >
              {projectName.substring(0, 4)+'-'+id.substring(0,4)}
            </Link>
          </div>
          <div className="col-md-4"> 
            {name}
          </div>
          <div className="col-md-2"> 
            {statusName}
          </div>
        </div> 
      </div>	 
    </li>

  );

}

}

const mapStateToProps = state => {

  const {
    currentTask
  } = state.tasks;

  return {
    currentTask
  };
}

export default connect(mapStateToProps)(UserProjectsTasksItem);

