import React, { Component } from 'react';
import './UserProjectsItem.component.css';
import UserProjectsTasks from '../UserProjectsTasks/UserProjectsTasks.component';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadProject, setProjectEmployees, setProjectTasks } from '../../redux/actionsProjects';	

class UserProjectsItem extends Component {

changeProject = (id) => {
  const { dispatch } = this.props;
  dispatch(loadProject(id));
  dispatch(setProjectEmployees(id));
  dispatch(setProjectTasks(id));
}

render() {

  const { projectId, projectName, tasks } = this.props;

  return (
    <div>
      <li className="project-items">

        <Link
          className="link--project"
          to={'/project/'+projectId}
          onClick={() => this.changeProject(projectId)}
        >

          {projectName}
        </Link>
        {
		  tasks.length ?
            <UserProjectsTasks
              tasks={tasks}
              projectName={projectName}
            />
            :<div>No tasks in this project assigned to current user</div>
        }
      </li>	
    </div>

  );

}

}


const mapStateToProps = (state) => {

  const {
    currentProject
  } = state.projects;


  return {
    currentProject
  };
}


export default connect(mapStateToProps)(UserProjectsItem);
